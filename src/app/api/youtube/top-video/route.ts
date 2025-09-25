import type {
	TopVideoDataResponse,
	YouTubeSearchResponse,
} from "@/app/api/youtube/top-video/types";
import { createResponse } from "@/libs/next/response";
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
		return createResponse(
			{
				status: {
					code: 400,
					message: "検索クエリが指定されていません",
				},
			},
			{ status: 400 },
		);
	}

	const searchUrl = `${BASE_URL}/search
		?part=snippet
		&q=${encodeURIComponent(query)}
		&key=${API_KEY}
		&type=video
		&maxResults=1
		&videoEmbeddable=true
		&regionCode=JP
		&safeSearch=moderate`;

	const searchRes = await fetch(searchUrl, {
		next: { revalidate: REVALIDATE_ONE_MONTH },
	});
	const searchData: YouTubeSearchResponse = await searchRes.json();

	console.log("searchData:", searchData);

	try {
		if (searchData.items.length === 0)
			return createResponse(
				{
					status: {
						code: 404,
						message: "動画情報が見つかりませんでした",
					},
				},
				{ status: 404 },
			);

		return createResponse<TopVideoDataResponse>(
			{
				data: {
					videoId: searchData.items[0].id.videoId,
					videoTitle: searchData.items[0].snippet.title,
					videoDescription: searchData.items[0].snippet.description,
					channel: searchData.items[0].snippet.channelTitle,
				},
				status: {
					code: 200,
					message: "動画情報が見つかりました",
				},
			},
			{
				status: 200,
			},
		);
	} catch (_error) {
		return createResponse(
			{
				status: {
					code: 500,
					message: "動画情報の取得に失敗しました",
				},
			},
			{ status: 500 },
		);
	}
}
