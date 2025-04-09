import type { SpotifyArtistTopTracksResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify のアーティストのトップトラック情報を取得
 * @returns {Promise<SpotifyArtistTopTracksResponse>}
 */
export async function getTopTracksByArtist(artist_id: string) {
	const res = await fetchSpotifyData<SpotifyArtistTopTracksResponse>(
		`artists/${artist_id}/top-tracks`,
	);
	return res;
}
