import type { SpotifySearchResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

/**
 * Spotifyの検索API
 * アルバム、アーティスト、トラックを検索
 * @returns {Promise<SpotifySearchResponse>}
 */
export const getSearchItems = async (query: string) => {
	return fetchSpotifyData<SpotifySearchResponse>(
		`search?q=${encodeURIComponent(query)}&type=album,artist,track`,
	);
};
