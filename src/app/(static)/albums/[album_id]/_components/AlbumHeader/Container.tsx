import { getAlbum } from "@/app/_fetchers/getAlbum";
import { Presentational } from "@/app/(static)/albums/[album_id]/_components/AlbumHeader/Presentational";

type Props = {
	album_id: string;
};

export const Container = async (props: Props) => {
	const { album_id } = props;
	const albumData = await getAlbum(album_id);

	return <Presentational albumData={albumData} />;
};
