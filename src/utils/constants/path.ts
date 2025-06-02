export const PATH = {
	HOME: "/",
	NEW: "/new",
	PICK_UP: "/pick-up",

	ALBUMS: (album_id: string) => `/albums/${album_id}`,
	ARTISTS: (artist_id: string) => `/artists/${artist_id}`,
} as const;
