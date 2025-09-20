import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";
import { REVALIDATE_ONE_HOUR } from "@/utils/constants/revalidate";

/**
 * 日本国内での人気アルバムを取得
 * @returns {Promise<SpotifyAlbumsResponse>}
 */
export const getPopularityAlbums = async ({
	offset = 0,
	limit = 20,
}: {
	offset?: number;
	limit?: number;
} = {}) => {
	return fetchSpotifyData<SpotifyAlbumsResponse>(
		`search?q=album&type=album&limit=${limit}&offset=${offset}&market=JP`,
		REVALIDATE_ONE_HOUR,
	);
};
