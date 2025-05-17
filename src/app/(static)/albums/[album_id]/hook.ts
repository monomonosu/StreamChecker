import { useSetAtom } from "jotai";

import {
	isOpenFooterAtom,
	trackIdAtom,
	trackQueueAtom,
} from "@/libs/stores/video";

export const useAlbum = () => {
	// TODO: 共通のhooksとして切り出せそう
	const setTrackQueue = useSetAtom(trackQueueAtom);
	const setTrackId = useSetAtom(trackIdAtom);
	const setIsOpenFooter = useSetAtom(isOpenFooterAtom);

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
		handleClickTrack,
	};
};
