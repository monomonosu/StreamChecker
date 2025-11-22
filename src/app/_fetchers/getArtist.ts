import type { SpotifyArtistResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";
import { REVALIDATE_ONE_DAY } from "@/utils/constants/revalidate";

/**
 * Spotify のアーティスト情報を取得
 * @returns {Promise<SpotifyArtistResponse>}
 */
export async function getArtist(artist_id: string) {
	const res = await fetchSpotifyData<SpotifyArtistResponse>(
		`artists/${artist_id}`,
		REVALIDATE_ONE_DAY,
	);
	return res;
}
