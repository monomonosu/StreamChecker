/**
 * 検索結果レスポンスのJSON
 */
export type YouTubeSearchResponse = {
	kind: "youtube#searchListResponse";
	etag: string;
	nextPageToken?: string;
	regionCode: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: YouTubeSearchItem[];
};

/**
 * 検索結果アイテム
 */
export type YouTubeSearchItem = {
	kind: "youtube#searchResult";
	etag: string;
	id: {
		kind: "youtube#video";
		videoId: string;
	};
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			default: Thumbnail;
			medium: Thumbnail;
			high: Thumbnail;
		};
		channelTitle: string;
		liveBroadcastContent: string;
		publishTime: string;
	};
};

/**
 * サムネイル情報
 */
type Thumbnail = {
	url: string;
	width: number;
	height: number;
};
