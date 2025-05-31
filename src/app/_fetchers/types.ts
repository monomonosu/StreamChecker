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

/**
 * アーティストの情報
 */
type SpotifyArtistItem = {
	id: string;
	name: string;
	images: { url: string; width: number; height: number }[];
	external_urls: { spotify: string };
	href: string;
	type: "artist";
	uri: string;
	followers?: { total: number; href: string | null };
	genres?: string[];
	popularity?: number;
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
 * 検索結果の情報
 * @see /search?q=
 */
export type SpotifySearchResponse = {
	tracks: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: SpotifyTrackItem[];
	};
	albums: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: SpotifyAlbumItem[];
	};
	artists: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: SpotifyArtistItem[];
	};
};

/**
 * アーティストの情報
 * @see /artists/[id]
 */
export type SpotifyArtistResponse = SpotifyArtistItem;

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

/**
 * アルバムの情報
 * @see /albums/[id]
 */
export type SpotifyAlbumResponse = {
	album_type: "album" | "single" | "compilation";
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Array<{
		url: string;
		height: number | null;
		width: number | null;
	}>;
	name: string;
	release_date: string;
	release_date_precision: "year" | "month" | "day";
	restrictions?: {
		reason: "market" | "product" | "explicit";
	};
	type: "album";
	uri: string;
	artists: Array<{
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		name: string;
		type: "artist";
		uri: string;
	}>;
	tracks: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: Array<{
			artists: Array<{
				external_urls: {
					spotify: string;
				};
				href: string;
				id: string;
				name: string;
				type: "artist";
				uri: string;
			}>;
			available_markets: string[];
			disc_number: number;
			duration_ms: number;
			explicit: boolean;
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			is_playable?: boolean;
			linked_from?: {
				external_urls: {
					spotify: string;
				};
				href: string;
				id: string;
				type: "track";
				uri: string;
			};
			restrictions?: {
				reason: string;
			};
			name: string;
			preview_url: string | null;
			track_number: number;
			type: "track";
			uri: string;
			is_local: boolean;
		}>;
	};
	copyrights: Array<{
		text: string;
		type: "C" | "P";
	}>;
	external_ids: {
		isrc?: string;
		ean?: string;
		upc?: string;
	};
	genres: string[];
	label: string;
	popularity: number;
};
