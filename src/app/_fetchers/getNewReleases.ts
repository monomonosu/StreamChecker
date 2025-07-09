import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify の新着アルバムを取得
 * @returns {Promise<SpotifyAlbumsResponse>}
 */
export async function getNewReleases({
	offset = 0,
	limit = 20,
}: {
	offset?: number;
	limit?: number;
} = {}) {
	const res = await fetchSpotifyData<SpotifyAlbumsResponse>(
		`browse/new-releases?offset=${offset}&limit=${limit}&market=JP&language=ja-JP`,
	);

	return res;
}
