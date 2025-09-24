"use client";

import type { CustomResponse } from "@/app/api/type";
import type { TopVideoDataResponse } from "@/app/api/youtube/top-video/types";
import { REVALIDATE_ONE_MONTH } from "@/utils/constants/revalidate";

/**
 * Youtubeの検索結果トップの動画URLを取得
 * @param {string} query
 * @returns {Promise<string|null>}
 */
export async function getTopMovieBySearch(
	query: string,
	errorHandling?: (res: CustomResponse) => void,
): Promise<TopVideoDataResponse | null> {
	const encodeQuery = encodeURIComponent(query);
	// apiRouterから取得
	const url = `/api/youtube/top-video?q=${encodeQuery}`;

	try {
		const fetcher = await fetch(url, {
			next: { revalidate: REVALIDATE_ONE_MONTH },
		});

		const res: CustomResponse<TopVideoDataResponse> = await fetcher.json();

		if (errorHandling) {
			errorHandling(res);
		}

		console.log("res", res);

		if (!res.data) return null;
		if (!res.data?.videoId) return null;

		return res.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
