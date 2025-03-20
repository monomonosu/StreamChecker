/**
 * Spotify API から取得したアルバム一覧情報のレスポンスを表す型
 */
export type SpotifyAlbumsResponse = {
	albums: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: SpotifyAlbumItem[];
	};
};

/**
 * アルバムの情報
 */
type SpotifyAlbumItem = {
	id: string;
	name: string;
	artists: { id: string; name: string }[];
	release_date: string;
	total_tracks: number;
	images: { url: string; width: number; height: number }[];
	external_urls: { spotify: string };
};

/**
 * アーティストの情報
 */
export type SpotifyArtistResponse = {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string | null; // `href` は通常 null になることが多い
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	name: string;
	popularity: number;
	type: "artist";
	uri: string;
};
