import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Presentational } from "@/app/(static)/search/_components/NonResult/Presentational";

type Props = {
	query: string;
};

export const Container = async (props: Props) => {
	const { query } = props;
	const data = query ? await getSearchItems(query) : null;

	return (
		<>
			{!data ||
				(data.artists.items.length === 0 &&
					data.albums.items.length === 0 &&
					data.tracks.items.length === 0 && <Presentational />)}

			{data && null}
		</>
	);
};
