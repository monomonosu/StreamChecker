/* ========================================
   共通Types
   ======================================== */

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
 * トラックの情報
 */
type SpotifyTrackItem = {
	id: string;
	name: string;
	duration_ms: number;
	artists: { id: string; name: string }[];
	album: { id: string; name: string; images: { url: string }[] };
	external_urls: { spotify: string };
};

/* ========================================
   レスポンスTypes
   ======================================== */

/**
 * おすすめニューリリース情報
 * @see /browse/new-releases
 * @see /search?q=album&type=album&market=jp&language=ja-JP&limit=10
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
 * アーティストの情報
 * @see /artists/[id]
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

/**
 * アーティストのアルバアム情報
 * @see /artists/[id]/albums
 */
export type SpotifyArtistAlbumsResponse = {
	href: string;
	items: SpotifyAlbumItem[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
};

/**
 * アーティストのトップトラック情報
 * @see /artists/[id]/top-tracks
 */
export type SpotifyArtistTopTracksResponse = {
	tracks: SpotifyTrackItem[];
};
