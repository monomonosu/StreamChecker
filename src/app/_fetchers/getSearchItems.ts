import type { SpotifySearchResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";
import { REVALIDATE_ONE_DAY } from "@/utils/constants/revalidate";

/**
 * Spotifyの検索API
 * アルバム、アーティスト、トラックを検索
 * @returns {Promise<SpotifySearchResponse>}
 */
export const getSearchItems = async (query: string) => {
	return fetchSpotifyData<SpotifySearchResponse>(
		`search?q=${encodeURIComponent(query)}&type=album,artist,track`,
		REVALIDATE_ONE_DAY,
	);
};
