import type { MetadataRoute } from "next";

const robots: MetadataRoute.Robots = {
	rules: [
		{
			userAgent: "ClaudeBot",
			disallow: "/",
		},
	],
};

export default robots;
