import { useAtom, useAtomValue } from "jotai";
import { type RefObject, useEffect } from "react";
import type { VideoTrack } from "@/app/_components/client/FooterPlayer/useFooterPlayer";
import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";
import {
	currentVideoIndexAtom,
	totalVideoCountAtom,
	trackQueueAtom,
} from "@/libs/stores/video";
import { useErrorHandle } from "@/utils/hooks/useErrorHandle";
import { usePlayState } from "@/utils/hooks/usePlayState";

type Props = {
	currentTrackIdRef: RefObject<string | undefined>;
	beforeTrackIdRef: RefObject<string | undefined>;
	playerRef: RefObject<YT.Player | null>;
	videoListRef: RefObject<string[]>;
	videoTrackQueueRef: RefObject<VideoTrack[]>;
};

export const useSetPlayList = (props: Props) => {
	const {
		currentTrackIdRef,
		beforeTrackIdRef,
		playerRef,
		videoListRef,
		videoTrackQueueRef,
	} = props;

	const [currentVideoIndex, setCurrentVideoIndex] = useAtom(
		currentVideoIndexAtom,
	);
	const totalVideoCount = useAtomValue(totalVideoCountAtom);
	const trackQueue = useAtomValue(trackQueueAtom);

	const { setPlay } = usePlayState();
	const { errorHandling } = useErrorHandle();

	// biome-ignore lint/correctness/useExhaustiveDependencies: 無限レンダリング防止のため
	useEffect(() => {
		const addPlaylist = async () => {
			if (currentVideoIndex && currentVideoIndex + 1 === totalVideoCount) {
				setPlay(currentTrackIdRef.current);
				const currentTrackIndex = trackQueue.findIndex(
					(track) => track.id === currentTrackIdRef.current,
				);
				const nextTrack = trackQueue[currentTrackIndex + 1];

				if (!nextTrack) return;

				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title}`,
					errorHandling,
				);

				if (!res) return;

				currentTrackIdRef.current = nextTrack.id;
				videoListRef.current.push(res.videoId);
				playerRef.current?.loadPlaylist(
					videoListRef.current,
					currentVideoIndex,
				);
				videoTrackQueueRef.current.push({
					trackId: nextTrack.id,
					videoId: res.videoId,
				});
			}

			if (currentVideoIndex === 0) {
				const currentTrackIndex = trackQueue.findIndex(
					(track) => track.id === beforeTrackIdRef.current,
				);
				const prevTrack = trackQueue[currentTrackIndex - 1];

				if (!prevTrack) return;

				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${prevTrack.artist} ${prevTrack.title}`,
					errorHandling,
				);

				if (!res) return;

				beforeTrackIdRef.current = prevTrack.id;
				videoListRef.current.unshift(res.videoId);
				playerRef.current?.loadPlaylist(videoListRef.current, 1);
				videoTrackQueueRef.current.unshift({
					trackId: prevTrack.id,
					videoId: res.videoId,
				});
				setCurrentVideoIndex(1);
			}
		};

		addPlaylist();
	}, [trackQueue, currentVideoIndex, totalVideoCount]);
};
