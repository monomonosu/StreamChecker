import { useSetAtom } from "jotai";

import {
	isOpenFooterAtom,
	trackIdAtom,
	trackQueueAtom,
} from "@/libs/stores/video";
import { usePlayIcon } from "@/utils/hooks/usePlayIcon";
import { usePlayState } from "@/utils/hooks/usePlayState";

export const useArtist = () => {
	const setTrackQueue = useSetAtom(trackQueueAtom);
	const setTrackId = useSetAtom(trackIdAtom);
	const setIsOpenFooter = useSetAtom(isOpenFooterAtom);

	const { playingTrackId } = usePlayState();
	const { getPlaySource } = usePlayIcon();

	/**
	 * トラックをクリックした時にtrackIdのみセット
	 * @param {Track[]} tracks
	 * @param {string} trackId
	 */
	const handleClickTrack = async ({
		trackQueue,
		trackId,
	}: {
		trackQueue: Track[];
		trackId: string;
	}) => {
		// NOTE:再生キューのstore
		setTrackQueue(trackQueue);
		setTrackId(trackId);
		// NOTE:Footerエリア用のstore
		setIsOpenFooter(true);
	};

	return {
		playingTrackId,
		playSource: getPlaySource(),
		handleClickTrack,
	};
};
