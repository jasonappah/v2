import { Client as NotionAPIClient, isFullPageOrDataSource } from "@notionhq/client";
import { DataSourceObjectResponse, EmptyObject, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";

const notionClient = new NotionAPIClient({
    auth: process.env.NOTION_TOKEN,
});


interface KVPagePropertyToNotionType {
    Text1: string
    Number1: number
}

export const KV_CACHE_TAG = "kv";
const KV_CACHE_REVALIDATE_SECONDS = 60 * 60 * 24 * 7; // 24 hours


export async function getKey<T extends keyof KVPagePropertyToNotionType>(key: string, field: T): Promise<KVPagePropertyToNotionType[T] | null> {
    return unstable_cache(
        async () => {
            const dbId = process.env.NOTION_KEY_VALUE_DATABASE_ID
            if (!dbId) {
                throw new Error("NOTION_KEY_VALUE_DATABASE_ID environment variable is not set")
            }

            const kvData = await notionClient.dataSources.query({
                data_source_id: dbId,
                filter: {
                    property: 'key',
                    title: {
                        equals: key
                    }
                },
                page_size: 1
            })

            if (kvData.has_more) {
                throw new Error(`Key lookup in Notion is ambiguous. Only expected one KV record for key ${key} but see more than one`)
            }

            const [result] = kvData.results

            if (!result) {
                throw new Error("Key lookup in Notion failed - this key does not exist.")
            }

            if (!isFullPageOrDataSource(result)) {
                throw new Error("Received unexpected result from Notion key lookup")
            }

            const fieldValue = result.properties[field]

            if (!fieldValue) {
                throw new Error(`KV record for key "${key}" is missing the "${field}" property`)
            }

            switch (field) {
                case "Number1":
                    if (fieldValue.type !== "number") {
                        throw new Error(`Expected number column but got ${fieldValue.type}`)
                    }
                    if (fieldValue.number === null) {
                        return null
                    }
                    if (typeof fieldValue.number === "number") {
                        return fieldValue.number as KVPagePropertyToNotionType[T]
                    }
                    {
                        const coerced = Number(fieldValue.number.format)
                        if (Number.isNaN(coerced)) {
                            throw new Error(
                                `Failed to coerce number format "${fieldValue.number.format}" to a number for key "${key}"`
                            )
                        }
                        return coerced as KVPagePropertyToNotionType[T]
                    }
                case "Text1":
                    if (fieldValue.type !== "rich_text") {
                        throw new Error(`Expected rich_text column but got ${fieldValue.type}`)
                    }
                    return fieldValue.rich_text.map((item) => item.plain_text).join("") as KVPagePropertyToNotionType[T]
                default: {
                    const _exhaustive: never = field
                    throw new Error(`Unhandled KV field: ${_exhaustive}`)
                }
            }
        },
        ["getKey", key, field],
        { tags: [KV_CACHE_TAG], revalidate: KV_CACHE_REVALIDATE_SECONDS }
    )();
}
