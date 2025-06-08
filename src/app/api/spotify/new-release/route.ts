import { getNewReleases } from "@/app/_fetchers/getNewReleases";
import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { NextResponse } from "next/server";

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
			return NextResponse.json(
				{ error: "No new releases found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
