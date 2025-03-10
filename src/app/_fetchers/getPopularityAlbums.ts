import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * 日本国内での人気アルバムを取得
 * @returns {Promise<SpotifyAlbumsResponse>}
 */
export const getPopularityAlbums = async () => {
	return fetchSpotifyData<SpotifyAlbumsResponse>(
		"search?q=album&type=album&market=jp&language=ja-JP&limit=10",
	);
};
