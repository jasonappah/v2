import { notFound } from "next/navigation";
import { getKey } from "../../../lib/server/getKV";
import StyledLink from "../../../components/StyledLink";

export const dynamic = 'error'

async function NfcKeyPage({params}: PageProps<"/links/[nfcKey]">) {
    const nfcKeyFromNotion = getKey("Secret Key for NFC Link page access", "Text1")
    if (await nfcKeyFromNotion !== (await params).nfcKey) {
        notFound()
    }
    
    const phoneNumberDisplay = await getKey("My Phone Number", "Text1")
    if (phoneNumberDisplay === null) {
        notFound()
    }
    const phoneNumberHref = formattedPhoneNumberToHref(phoneNumberDisplay)
    
    return (
        <StyledLink href={phoneNumberHref}>
            {phoneNumberDisplay}
        </StyledLink>
    )
}

const formattedPhoneNumberToHref = (phoneNumber: string) => 
    "tel:" + Array.from(phoneNumber.matchAll(/[+\d]/g)).join("");

export default NfcKeyPage

export async function generateStaticParams() {
    const nfcKeyFromNotion = await getKey("Secret Key for NFC Link page access", "Text1")

    if (!nfcKeyFromNotion) return []

    return [{ nfcKey: nfcKeyFromNotion }]
}