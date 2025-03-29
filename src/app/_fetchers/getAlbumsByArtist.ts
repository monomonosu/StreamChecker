import type { SpotifyArtistAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotify のアーティストのアルバム情報を取得
 * @returns {Promise<SpotifyArtistAlbumsResponse>}
 */
export async function getAlbumsByArtist(artist_id: string) {
	const res = await fetchSpotifyData<SpotifyArtistAlbumsResponse>(
		`artists/${artist_id}/albums`,
	);
	return res;
}
