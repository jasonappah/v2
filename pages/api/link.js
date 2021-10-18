// the idea with all of the weird cache stuff is we don't ever have to worry about hitting airtable's rate limits
// if i get a ton of traffic for some reason, while still being able to fetch new data from airtable every
// once in a while so i don't have to rebuild the site every time i want to update shortened links like i did previously.
// the other advantage of running redirects here instead of next.config.js is that i can add some basic/privacy-friendly
// logs of what links were accessed when and where which wasn't an option previously.
// also stale while revalidate is pretty pog, see https://vercel.com/docs/concepts/functions/edge-caching

// idk how to handle 404s yet but that shouldn't be too painful i hope - if i return a 404 does it 
// serve the 404 page for me? then i can style that and make it all nice

export default async (req, res) => {
	const ALLOWED_METHODS = ["GET", "HEAD"]
	if (!ALLOWED_METHODS.includes(req.method)) {
		return res.send("Only GET and HEAD methods are supported.")
	}

	if (req.cookies["_vercel_no_cache"] === 1 || req.query["?_vercel_no_cache"] === 1 || req.headers["Authorization"] || req.headers["Range"]) {
		return res.send("sorry, we must get that cash!")
	}

	// TODO: Airtable stuff
	
	res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate")
	return res.redirect(308, "https://jasonaa.me")
}
