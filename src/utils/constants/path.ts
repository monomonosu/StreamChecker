export const PATH = {
	HOME: "/",
	NEW: "/new",
	PICK_UP: "/pick-up",
	SEARCH: "/search",

	ALBUMS: (album_id: string) => `/albums/${album_id}`,
	ARTISTS: (artist_id: string) => `/artists/${artist_id}`,

	404: "/404",
} as const;
