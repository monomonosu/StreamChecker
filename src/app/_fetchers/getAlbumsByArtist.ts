import type { SpotifyArtistAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify のアーティスト情報を取得
 * @returns {Promise<SpotifyArtistResponse>}
 */
export async function getAlbumsByArtist(artist_id: string) {
	const res = await fetchSpotifyData<SpotifyArtistAlbumsResponse>(
		`artists/${artist_id}/albums`,
	);
	return res;
}
