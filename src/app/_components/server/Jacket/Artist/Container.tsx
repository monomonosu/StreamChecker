import { Presentational } from "@/app/_components/server/Jacket/Artist/Presentational";
import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";

type Props = {
	artist_id: string;
};

export const Container = async (props: Props) => {
	const { artist_id } = props;
	const artistAlbums = await getAlbumsByArtist({ artist_id });

	return <Presentational artistAlbums={artistAlbums} />;
};
