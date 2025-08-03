import { Presentational } from "@/app/_components/server/Jacket/Popularity/Presentational";
import { getPopularityAlbums } from "@/app/_fetchers/getPopularityAlbums";

export const Container = async () => {
	const popularityData = await getPopularityAlbums();

	return <Presentational popularityData={popularityData} />;
};
