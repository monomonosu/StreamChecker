import { NextResponse } from "next/server";

import type { CustomResponse } from "@/app/api/type";
import type { YouTubeSearchResponse } from "@/app/api/youtube/top-video/types";
import { REVALIDATE_ONE_MONTH } from "@/utils/constants/revalidate";

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = process.env.YOUTUBE_API_BASE_URL;

/**
 * Youtubeの検索結果トップの動画IDを取得
 * @query q {string} 検索クエリ
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q");

	if (!query) {
		return NextResponse.json(
			{
				status: {
					code: 400,
					message: "検索クエリが指定されていません",
				},
			} as CustomResponse,
			{ status: 400 },
		);
	}

	const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video&maxResults=1`;

	const searchRes = await fetch(searchUrl, {
		next: { revalidate: REVALIDATE_ONE_MONTH },
	});
	const searchData: YouTubeSearchResponse = await searchRes.json();

	try {
		if (searchData.items.length === 0)
			return NextResponse.json(
				{
					status: {
						code: 404,
						message: "動画情報が見つかりませんでした",
					},
				} as CustomResponse,
				{ status: 404 },
			);

		const videoId = searchData.items[0].id.videoId;
		const videoTitle = searchData.items[0].snippet.title;
		const videoDescription = searchData.items[0].snippet.description;
		const channel = searchData.items[0].snippet.channelTitle;

		return NextResponse.json(
			{
				data: {
					videoId: videoId,
					videoTitle: videoTitle,
					videoDescription: videoDescription,
					channel: channel,
				},
				status: {
					code: 200,
					message: "動画情報が見つかりました",
				},
			} as CustomResponse,
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				status: {
					code: 500,
					message: error,
				},
			} as CustomResponse,
			{ status: 500 },
		);
	}
}
