import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Presentational } from "@/app/(static)/search/_components/ResultTop/Presentational";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	query: string;
};

export const Container = async (props: Props) => {
	const { query } = props;
	const data = query ? await getSearchItems(query) : null;

	if (!data) {
		return;
	}

	const tracksData =
		data?.tracks.items.map((track, index) => ({
			id: track.id,
			index: index + 1,
			title: track.name,
			artist: track.artists[0].name,
			duration: formatMsToMinSec(track.duration_ms),
		})) || [];

	const artist = data?.artists.items[0];
	const album = data?.albums.items[0];
	const tracks = tracksData.slice(0, 5);

	return (
		<>
			{data && <Presentational artist={artist} album={album} tracks={tracks} />}

			{!data && null}
		</>
	);
};
