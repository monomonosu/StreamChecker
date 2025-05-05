import { useSetAtom } from "jotai";

import {
	isOpenFooterAtom,
	trackIdAtom,
	trackQueueAtom,
} from "@/libs/stores/video";

export const useArtist = () => {
	const setTrackQueue = useSetAtom(trackQueueAtom);
	const setTrackId = useSetAtom(trackIdAtom);
	const setIsOpenFooter = useSetAtom(isOpenFooterAtom);

	/**
	 * トラックをクリックした時にtrackIdのみセット
	 * @param {Track[]} tracks
	 * @param {string} trackId
	 */
	const handleClickTrack = async ({
		tracks,
		trackId,
	}: {
		tracks: Track[];
		trackId: string;
	}) => {
		// NOTE:再生キューのstore
		setTrackQueue(tracks);
		setTrackId(trackId);
		// NOTE:Footerエリア用のstore
		setIsOpenFooter(true);
	};

	return {
		handleClickTrack,
	};
};
