import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Presentational } from "@/app/(static)/search/_components/ResultAlbum/Presentational";

type Props = {
	query: string;
};

export const Container = async (props: Props) => {
	const { query } = props;
	const data = query ? await getSearchItems(query) : null;

	const albums = data?.albums.items || [];

	return (
		<>
			{albums && <Presentational albums={albums} />}

			{!albums && null}
		</>
	);
};
