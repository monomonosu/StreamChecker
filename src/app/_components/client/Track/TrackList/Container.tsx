import { Presentational } from "@/app/_components/client/Track/TrackList/Presentational";
import { getAlbum } from "@/app/_fetchers/getAlbum";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	album_id: string;
};

export const Container = async (props: Props) => {
	const { album_id } = props;
	const data = await getAlbum(album_id);

	const tracks = data.tracks.items.map((track) => ({
		id: track.id,
		index: track.track_number,
		title: track.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	return <Presentational tracks={tracks} />;
};
