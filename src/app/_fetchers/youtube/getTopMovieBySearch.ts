/**
 * Youtubeの検索結果トップの動画URLを取得
 * @param {string} query
 * @returns {Promise<string|null>}
 */
export async function getTopMovieBySearch(
	query: string,
): Promise<{
	videoId: string;
	videoTitle: string;
	videoDescription: string;
} | null> {
	const encodeQuery = encodeURIComponent(query);
	// apiRouterから取得
	const url = `/api/youtube/top-video?q=${encodeQuery}`;

	try {
		const res = await fetch(url);
		const data: {
			videoId: string;
			videoTitle: string;
			videoDescription: string;
		} = await res.json();

		if (!data.videoId) return null;

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
