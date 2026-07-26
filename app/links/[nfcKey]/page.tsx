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
    
    const phoneNumber = digitsOnlyPhoneNumber(phoneNumberDisplay)
    const phoneNumberHref = "tel:" + phoneNumber
    const addToContactsHref = vCardDataUrl({
        name: "Jason Antwi-Appah",
        email: Buffer.from("aGV5QGphc29uYWEubWU=", "base64").toString("utf8"),
        phoneNumber,
        photoUrl: "https://github.com/jasonappah.png",
    })
    
    return (
        <p>
            <StyledLink href={phoneNumberHref}>
                {phoneNumberDisplay}
            </StyledLink>
            &nbsp;&bull;&nbsp;
            <a
                href={addToContactsHref}
                download="Jason Antwi-Appah.vcf"
                className="transition text-accent hover:text-back hover:bg-content"
            >
                add to contacts
            </a>
        </p>
    )
}

const digitsOnlyPhoneNumber = (phoneNumber: string) =>
    Array.from(phoneNumber.matchAll(/[+\d]/g)).join("");

function vCardDataUrl({
    name,
    email,
    phoneNumber,
    photoUrl,
}: {
    name: string
    email: string
    phoneNumber: string
    photoUrl: string
}) {
    const [firstName, ...rest] = name.split(" ")
    const lastName = rest.join(" ")
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${lastName};${firstName};;;`,
        `FN:${name}`,
        `EMAIL;TYPE=INTERNET:${email}`,
        `TEL;TYPE=CELL:${phoneNumber}`,
        `PHOTO;VALUE=URI:${photoUrl}`,
        "END:VCARD",
    ].join("\r\n")

    return `data:text/vcard;charset=utf-8;base64,${Buffer.from(vcard).toString("base64")}`
}

export default NfcKeyPage

export async function generateStaticParams() {
    const nfcKeyFromNotion = await getKey("Secret Key for NFC Link page access", "Text1")

    if (!nfcKeyFromNotion) return []

    return [{ nfcKey: nfcKeyFromNotion }]
}