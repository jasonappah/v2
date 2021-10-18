module.exports = {
	async rewrites() {
		return {
			fallback: [
				{
					source: "/:path*",
					destination: `/api/link/?slug=:path*`
				}
			]
		}
	}
}
