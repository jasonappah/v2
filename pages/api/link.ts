// the idea with all of the weird cache stuff is we don't ever have to worry about hitting airtable's rate limits
// if i get a ton of traffic for some reason, while still being able to fetch new data from airtable every
// once in a while so i don't have to rebuild the site every time i want to update shortened links like i did previously.
// the other advantage of running redirects here instead of next.config.js is that i can add some basic/privacy-friendly
// logs of what links were accessed when and where which wasn't an option previously.
// also stale while revalidate is pretty pog, see https://vercel.com/docs/concepts/functions/edge-caching

import path from "path"
import type {NextApiRequest, NextApiResponse} from "next"
import { getLinks } from "../../lib/server/getLinks"

const link = async (req: NextApiRequest, res: NextApiResponse) => {
	const ALLOWED_METHODS = ["GET", "HEAD"]
	const DEFAULT = "https://jasonaa.me"
	if (!ALLOWED_METHODS.includes(req.method)) {
		return res.send("Only GET and HEAD methods are supported.")
	}

	if (
		req.cookies["_vercel_no_cache"] === "1" ||
		req.query["?_vercel_no_cache"] === "1" ||
		req.headers["Authorization"] ||
		req.headers["Range"]
	) {
		return res.send("sorry, we must get that cash!")
	}

	res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate")

	if (!req.query.slug) {
		// for vercel to cache the response it has to be a 308 redirect
		return res.redirect(308, DEFAULT)
	}
	const slug = path.format(path.parse(req.query.slug as string))

	const links = await getLinks()
	const url = links[slug]["Redirect URL"] || DEFAULT

	return res.redirect(308, url)
}

export default link
