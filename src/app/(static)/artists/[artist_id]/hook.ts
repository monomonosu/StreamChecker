import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";

export const useArtist = () => {
	/**
	 * トラックをクリックした時にYoutubeの動画を開く
	 * TODO:iframeで表示してページ遷移しても表示され続けるようにする
	 * @param artistName
	 * @param musicName
	 * @param albumName
	 * @returns {void}
	 */
	const handleClickTrack = async ({
		artistName,
		musicName,
		albumName,
	}: { artistName: string; musicName: string; albumName: string }) => {
		const res = await getTopMovieBySearch(
			`${artistName} ${musicName} ${albumName}`,
		);

		if (!res) return;

		window.open(res);
	};

	return {
		handleClickTrack,
	};
};
