import { useSetAtom } from "jotai";
import { type RefObject, useEffect } from "react";
import {
	currentVideoIndex,
	totalVideoCount,
	videoTitleAtom,
	videoUrlAtom,
} from "@/libs/stores/video";
import { usePlayState } from "@/utils/hooks/usePlayState";

type Props = {
	playerRef: RefObject<YT.Player | null>;
	currentTrackIdRef: RefObject<string | undefined>;
};

export const useSetUpPlayer = (props: Props) => {
	const { playerRef, currentTrackIdRef } = props;

	const setVideoTitle = useSetAtom(videoTitleAtom);
	const setVideoUrl = useSetAtom(videoUrlAtom);
	const setCurrentVideoIndex = useSetAtom(currentVideoIndex);
	const setTotalVideoCount = useSetAtom(totalVideoCount);

	const { setPlay, setPause } = usePlayState();

	useEffect(() => {
		if (window && !window.YT) {
			const tag = document.createElement("script");
			tag.id = "youtube-iframe-api";
			tag.src = "https://www.youtube.com/iframe_api";
			document.body.appendChild(tag);
		}

		window.onYouTubeIframeAPIReady = () => {
			playerRef.current = new window.YT.Player("youtube-player", {
				playerVars: {
					autoplay: 1,
				},
				events: {
					onStateChange: (event: YT.OnStateChangeEvent) => {
						const player = event.target as YTPlayerWithVideoData;
						const currentIndex = player.getPlaylistIndex();
						const totalVideos = player.getPlaylist()?.length ?? 0;
						const playVideoData = player.getVideoData();

						setVideoTitle(playVideoData.title);
						setVideoUrl(
							`https://www.youtube.com/watch?v=${playVideoData.video_id}`,
						);

						switch (event.data) {
							case window.YT.PlayerState.UNSTARTED: {
								if (!currentTrackIdRef.current && currentIndex !== 0) return;

								// 次の動画のストックがない場合（nextTack）
								if (currentIndex + 1 === totalVideos) {
									setCurrentVideoIndex(currentIndex);
									setTotalVideoCount(totalVideos);
									return;
								}

								if (currentIndex === 0) {
									setCurrentVideoIndex(currentIndex);
									return;
								}

								break;
							}
							case window.YT.PlayerState.ENDED: {
								setPause();
								break;
							}
							case window.YT.PlayerState.PLAYING: {
								if (!currentTrackIdRef.current) return;
								setPlay();
								break;
							}
							case window.YT.PlayerState.PAUSED: {
								if (!currentTrackIdRef.current) return;
								setPause();
								break;
							}
							case window.YT.PlayerState.BUFFERING: {
								if (!currentTrackIdRef.current) return;
								setPause();
								break;
							}
						}
					},
				},
			});
		};
	}, [
		setVideoTitle,
		setVideoUrl,
		setCurrentVideoIndex,
		setTotalVideoCount,
		setPlay,
		setPause,
		currentTrackIdRef.current,
		playerRef,
	]);
};
