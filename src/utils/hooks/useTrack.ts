import { useSetAtom } from "jotai";

import {
	isOpenFooterAtom,
	trackIdAtom,
	trackQueueAtom,
} from "@/libs/stores/video";

export const useTrack = () => {
	const setTrackQueue = useSetAtom(trackQueueAtom);
	const setTrackId = useSetAtom(trackIdAtom);
	const setIsOpenFooter = useSetAtom(isOpenFooterAtom);

	/**
	 * @param {Track[]} tracks
	 * @param {string} trackId
	 * @description トラックをクリックした時に、トラックキューとトラックIDをセットし、フッターを開く
	 */
	const handleClickTrack = async ({
		trackQueue,
		trackId,
	}: {
		trackQueue: Track[];
		trackId: string;
	}) => {
		setTrackQueue(trackQueue);
		setTrackId(trackId);
		setIsOpenFooter(true);
	};

	return {
		handleClickTrack,
	};
};
