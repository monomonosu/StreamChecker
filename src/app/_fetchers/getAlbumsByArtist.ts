import type { SpotifyArtistAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";
import { REVALIDATE_ONE_DAY } from "@/utils/constants/revalidate";

/**
 * Spotify のアーティストのアルバム情報を取得
 * @returns {Promise<SpotifyArtistAlbumsResponse>}
 */
export async function getAlbumsByArtist({
	artist_id,
	offset = 0,
	limit = 20,
}: {
	artist_id: string;
	offset?: number;
	limit?: number;
}) {
	const res = await fetchSpotifyData<SpotifyArtistAlbumsResponse>(
		`artists/${artist_id}/albums?include_groups=album,single,appears_on,compilation&offset=${offset}&limit=${limit}`,
		REVALIDATE_ONE_DAY,
	);
	return res;
}
