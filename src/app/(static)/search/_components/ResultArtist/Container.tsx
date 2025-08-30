import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Presentational } from "@/app/(static)/search/_components/ResultArtist/Presentational";

type Props = {
	query: string;
};

export const Container = async (props: Props) => {
	const { query } = props;
	const data = query ? await getSearchItems(query) : null;

	const artists = data?.artists.items || [];

	return <Presentational artists={artists} />;
};
