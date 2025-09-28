import { useEffect } from "react";

type Props = {
	isInitVideoLoad: boolean;
	playerRef: React.RefObject<YT.Player | null>;
	videoListRef: React.RefObject<string[]>;
	currentTrackIdRef: React.RefObject<string | undefined>;
};

export const useSetInitPlayList = (props: Props) => {
	const { isInitVideoLoad, playerRef, videoListRef, currentTrackIdRef } = props;

	useEffect(() => {
		if (!isInitVideoLoad || !playerRef.current) return;

		// trackQueueの先頭のインデックスが選択された時・それ以外のインデックスが選択された時の考慮
		playerRef.current.loadPlaylist(
			videoListRef.current,
			videoListRef.current.length > 2 || !currentTrackIdRef.current ? 1 : 0,
		);
	}, [isInitVideoLoad, playerRef, videoListRef, currentTrackIdRef]);
};
