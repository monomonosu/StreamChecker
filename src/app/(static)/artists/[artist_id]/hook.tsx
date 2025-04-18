import { useSetAtom } from "jotai";

import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";
import {
	isOpenFooterAtom,
	videoDescriptionAtom,
	videoIdAtom,
	videoTitleAtom,
} from "@/libs/stores/video";

export const useArtist = () => {
	const setIsOpenFooter = useSetAtom(isOpenFooterAtom);
	const setVideoId = useSetAtom(videoIdAtom);
	const setVideoTitle = useSetAtom(videoTitleAtom);
	const setVideoDescription = useSetAtom(videoDescriptionAtom);

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

		setIsOpenFooter(true);
		setVideoId(res.videoId);
		setVideoTitle(res.videoTitle);
		setVideoDescription(res.videoDescription);
	};

	return {
		handleClickTrack,
	};
};
