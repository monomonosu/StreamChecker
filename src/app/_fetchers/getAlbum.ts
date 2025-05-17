import type { SpotifyAlbumResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";

export async function getAlbum(album_id: string) {
	const res = await fetchSpotifyData<SpotifyAlbumResponse>(
		`albums/${album_id}`,
	);

	return res;
}
