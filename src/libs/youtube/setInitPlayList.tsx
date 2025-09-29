import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { isInitVideoLoadAtom } from "@/libs/stores/video";

type Props = {
	currentTrackIdRef: React.RefObject<string | undefined>;
	playerRef: React.RefObject<YT.Player | null>;
	videoListRef: React.RefObject<string[]>;
};

export const useSetInitPlayList = (props: Props) => {
	const { currentTrackIdRef, playerRef, videoListRef } = props;

	const isInitVideoLoad = useAtomValue(isInitVideoLoadAtom);

	useEffect(() => {
		if (!isInitVideoLoad || !playerRef.current) return;

		// trackQueueの先頭のインデックスが選択された時・それ以外のインデックスが選択された時の考慮
		playerRef.current.loadPlaylist(
			videoListRef.current,
			videoListRef.current.length > 2 || !currentTrackIdRef.current ? 1 : 0,
		);
	}, [isInitVideoLoad, playerRef, videoListRef, currentTrackIdRef]);
};
