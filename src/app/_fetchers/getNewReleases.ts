import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify の新着アルバムを取得
 * @returns {Promise<SpotifyAlbumsResponse>}
 */
export async function getNewReleases() {
	return fetchSpotifyData<SpotifyAlbumsResponse>("browse/new-releases");
}
