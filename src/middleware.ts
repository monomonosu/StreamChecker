import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// ブロック対象
const BLOCKED_UA_PATTERNS = [
	/ClaudeBot/i,
	/Claude-SearchBot/i,
	/Claude-Web/i,
	/Claude-User/i,
];

export function middleware(req: NextRequest) {
	const ua = req.headers.get("user-agent") ?? "";

	if (BLOCKED_UA_PATTERNS.some((re) => re.test(ua))) {
		return new NextResponse("Forbidden", { status: 403 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// ほぼ全ルートに適用（静的ファイルなどは除外）
		"/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
	],
};
