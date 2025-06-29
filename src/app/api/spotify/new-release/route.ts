import { getNewReleases } from "@/app/_fetchers/getNewReleases";
import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { createResponse } from "@/libs/next/response";

/**
 * Spotifyの新着リリースを取得するAPIエンドポイント
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const offset = Number(searchParams.get("offset") || 0);
	const limit = Number(searchParams.get("limit") || 24);

	const res = await getNewReleases({
		offset,
		limit,
	});
	const data: SpotifyAlbumsResponse = await res;

	try {
		if (!data.albums || data.albums.items.length === 0) {
			return createResponse(
				{
					status: {
						code: 404,
						message: "最新リリース情報が見つかりませんでした",
					},
				},
				{ status: 404 },
			);
		}

		return createResponse<SpotifyAlbumsResponse>(
			{
				data: data,
				status: {
					code: 200,
					message: "新着リリース情報取得に成功しました",
				},
			},
			{ status: 200 },
		);
	} catch (_error) {
		return createResponse(
			{
				status: {
					code: 500,
					message: "新着リリース情報取得に失敗しました",
				},
			},
			{ status: 500 },
		);
	}
}
