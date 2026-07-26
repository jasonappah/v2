export const EMAIL_BASE64 = "aGV5QGphc29uYWEubWU=";

export function decodeEmail() {
  return Buffer.from(EMAIL_BASE64, "base64").toString("utf8");
}
