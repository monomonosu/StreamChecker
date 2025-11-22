import type { SpotifyAlbumResponse } from "@/app/_fetchers/types";
import { fetchSpotifyData } from "@/libs/spotify";
import { REVALIDATE_ONE_DAY } from "@/utils/constants/revalidate";

export async function getAlbum(album_id: string) {
	const res = await fetchSpotifyData<SpotifyAlbumResponse>(
		`albums/${album_id}`,
		REVALIDATE_ONE_DAY,
	);

	return res;
}
