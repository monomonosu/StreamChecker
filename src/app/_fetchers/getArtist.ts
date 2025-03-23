import type { SpotifyArtistResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify のアーティスト情報を取得
 * @returns {Promise<SpotifyArtistResponse>}
 */
export async function getArtist(artist_id: string) {
	const res = await fetchSpotifyData<SpotifyArtistResponse>(
		`artists/${artist_id}`,
	);
	return res;
}
