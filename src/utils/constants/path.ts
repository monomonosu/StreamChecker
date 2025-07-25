export const PATH = {
	HOME: "/",
	NEW: "/new",
	POPULARITY: "/popularity",
	SEARCH: "/search",

	ABOUT: "/about",
	GUIDE: "/guide",

	ALBUMS: (album_id: string) => `/albums/${album_id}`,
	ARTISTS: (artist_id: string) => `/artists/${artist_id}`,

	404: "/404",
} as const;
