import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify の新着アルバムを取得
 * @returns {Promise<SpotifyAlbumsResponse>}
 */
export async function getNewReleases() {
	const res = await fetchSpotifyData<SpotifyAlbumsResponse>(
		"browse/new-releases",
	);
	return res;
}
