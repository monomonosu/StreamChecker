import { getArtist } from "@/app/_fetchers/getArtist";
import { Presentational } from "@/app/(static)/artists/[artist_id]/albums/_components/ArtistAlbumTitle/Presentational";

type Props = {
	artist_id: string;
};

export const Container = async ({ artist_id }: Props) => {
	const artistData = await getArtist(artist_id);

	return <Presentational artistData={artistData} />;
};
