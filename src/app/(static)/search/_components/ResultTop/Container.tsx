import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Presentational } from "@/app/(static)/search/_components/ResultTop/Presentational";

type Props = {
	query: string;
};

export const Container = async (props: Props) => {
	const { query } = props;
	const data = query ? await getSearchItems(query) : null;

	return (
		<>
			{data && <Presentational data={data} />}

			{!data && null}
		</>
	);
};
