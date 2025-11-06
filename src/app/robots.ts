import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "ClaudeBot",
				disallow: "/",
			},
			{ userAgent: "Claude-SearchBot", disallow: "/" },
			{ userAgent: "Claude-Web", disallow: "/" },
			{ userAgent: "Claude-User", disallow: "/" },
		],
	};
}
