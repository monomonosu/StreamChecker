import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			// Claudeによるドキュメント作成許可のため、一時的に利用許可
			// {
			// 	userAgent: "ClaudeBot",
			// 	disallow: "/",
			// },
		],
	};
}
