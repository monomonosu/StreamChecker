import { NextResponse } from "next/server";

import { getPopularityAlbums } from "@/app/_fetchers/getPopularityAlbums";
import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";

/**
 * Spotifyの人気のアルバムを取得するAPIエンドポイント
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const offset = Number(searchParams.get("offset") || 0);
	const limit = Number(searchParams.get("limit") || 24);

	const res = await getPopularityAlbums({
		offset,
		limit,
	});
	const data: SpotifyAlbumsResponse = await res;

	try {
		if (!data.albums || data.albums.items.length === 0) {
			return NextResponse.json(
				{ error: "No popular albums found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
