export const PATH = {
	HOME: "/",
	NEW: "/new",
	POPULARITY: "/popularity",
	SEARCH: "/search",

	ABOUT: "/about",
	GUIDE: "/guide",

	TERMS_OF_USE: "/terms-of-use",
	PRIVACY_POLICY: "/privacy-policy",

	ALBUMS: (album_id: string) => `/albums/${album_id}`,
	ARTISTS: (artist_id: string) => `/artists/${artist_id}`,
	ARTIST_ALBUM: (artist_id: string) => `/artists/${artist_id}/albums`,

	404: "/404",
} as const;
