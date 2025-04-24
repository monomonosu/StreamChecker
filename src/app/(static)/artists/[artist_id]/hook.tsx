import { useSetAtom } from "jotai";

import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";
import {
	isOpenFooterAtom,
	trackQueueAtom,
	videoDescriptionAtom,
	videoIdAtom,
	videoTitleAtom,
} from "@/libs/stores/video";

export const useArtist = () => {
	const setTrackQueue = useSetAtom(trackQueueAtom);
	const setIsOpenFooter = useSetAtom(isOpenFooterAtom);
	const setVideoId = useSetAtom(videoIdAtom);
	const setVideoTitle = useSetAtom(videoTitleAtom);
	const setVideoDescription = useSetAtom(videoDescriptionAtom);

	/**
	 * トラックをクリックした時にYoutubeの動画を開く
	 * @param artistName
	 * @param musicName
	 * @param albumName
	 * @returns {void}
	 */
	const handleClickTrack = async ({
		tracks,
		artistName,
		musicName,
		albumName,
	}: {
		tracks: Track[];
		artistName: string;
		musicName: string;
		albumName: string;
	}) => {
		const res = await getTopMovieBySearch(
			`${artistName} ${musicName} ${albumName}`,
		);

		if (!res) return;

		// NOTE:再生キューのstore
		setTrackQueue(tracks);
		// NOTE:Footerエリア用のstore
		setIsOpenFooter(true);
		setVideoId(res.videoId);
		setVideoTitle(res.videoTitle);
		setVideoDescription(res.videoDescription);
	};

	return {
		handleClickTrack,
	};
};
