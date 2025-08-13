import { Presentational } from "@/app/_components/server/Jacket/NewRelease/Presentational";
import { getNewReleases } from "@/app/_fetchers/getNewReleases";

export const Container = async () => {
	const newReleaseData = await getNewReleases();

	return <Presentational newReleaseData={newReleaseData} />;
};
