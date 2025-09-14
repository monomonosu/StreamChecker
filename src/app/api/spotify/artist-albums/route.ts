import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";
import { createResponse } from "@/libs/next/response";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const artist_id = searchParams.get("artist_id");
	const offset = Number(searchParams.get("offset") || 0);
	const limit = Number(searchParams.get("limit") || 24);

	if (!artist_id) {
		return createResponse(
			{
				status: {
					code: 400,
					message: "アーティストが指定されていません",
				},
			},
			{ status: 400 },
		);
	}

	const res = await getAlbumsByArtist({ artist_id: artist_id, offset, limit });
	const data = await res;

	try {
		if (!data.items || data.items.length === 0) {
			return createResponse(
				{
					status: {
						code: 404,
						message: "アーティストのアルバム情報が見つかりませんでした",
					},
				},
				{ status: 404 },
			);
		}

		return createResponse(
			{
				data: data,
				status: {
					code: 200,
					message: "アーティストのアルバム情報取得に成功しました",
				},
			},
			{ status: 200 },
		);
	} catch (_error) {
		console.error("Error fetching artist albums", _error);
		return createResponse(
			{
				status: {
					code: 500,
					message: "アーティストのアルバム情報取得に失敗しました",
				},
			},
			{ status: 500 },
		);
	}
}
