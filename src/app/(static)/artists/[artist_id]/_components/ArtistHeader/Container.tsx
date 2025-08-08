import { getArtist } from "@/app/_fetchers/getArtist";
import { Presentational } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader/Presentational";

type Props = {
	artist_id: string;
};

export const Container = async (props: Props) => {
	const { artist_id } = props;
	const artistData = await getArtist(artist_id);

	return <Presentational artistData={artistData} />;
};
