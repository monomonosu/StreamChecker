import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = process.env.YOUTUBE_API_BASE_URL;

/**
 * Youtubeの検索結果トップの動画URLを取得
 * @query q {string} 検索クエリ
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q");

	if (!query) {
		return NextResponse.json(
			{ error: "Missing search query" },
			{ status: 400 },
		);
	}

	const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video&maxResults=1`;

	const searchRes = await fetch(searchUrl);
	const searchData = await searchRes.json();

	try {
		if (searchData.items.length === 0)
			return NextResponse.json({ error: "No video found" }, { status: 404 });

		const videoId = searchData.items[0].id.videoId;
		const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

		return NextResponse.json({ url: videoUrl });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
