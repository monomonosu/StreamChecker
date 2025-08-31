import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Presentational } from "@/app/(static)/search/_components/ResultTrack/Presentational";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	query: string;
};

export const Container = async (props: Props) => {
	const { query } = props;
	const data = query ? await getSearchItems(query) : null;

	const tracks =
		data?.tracks.items.map((track, index) => ({
			id: track.id,
			index: index + 1,
			title: track.name,
			artist: track.artists[0].name,
			duration: formatMsToMinSec(track.duration_ms),
		})) || [];

	return (
		<>
			{tracks && <Presentational tracks={tracks} />}

			{!tracks && null}
		</>
	);
};
