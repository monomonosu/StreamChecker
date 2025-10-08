import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type RefObject, useEffect } from "react";
import type { VideoTrack } from "@/app/_components/client/FooterPlayer/useFooterPlayer";
import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";
import {
	currentVideoIndexAtom,
	isInitVideoLoadAtom,
	totalVideoCountAtom,
	trackIdAtom,
	trackQueueAtom,
} from "@/libs/stores/video";
import { useErrorHandle } from "@/utils/hooks/useErrorHandle";
import { usePlayState } from "@/utils/hooks/usePlayState";

type Props = {
	currentTrackIdRef: RefObject<string | undefined>;
	beforeTrackIdRef: RefObject<string | undefined>;
	videoListRef: RefObject<string[]>;
	videoTrackQueueRef: RefObject<VideoTrack[]>;
};

export const useInitPlayList = (props: Props) => {
	const {
		currentTrackIdRef,
		beforeTrackIdRef,
		videoListRef,
		videoTrackQueueRef,
	} = props;

	const [trackId, setTrackId] = useAtom(trackIdAtom);
	const trackQueue = useAtomValue(trackQueueAtom);
	const setIsInitLoad = useSetAtom(isInitVideoLoadAtom);
	const setCurrentVideoIndex = useSetAtom(currentVideoIndexAtom);
	const setTotalVideoCount = useSetAtom(totalVideoCountAtom);

	const { errorHandling } = useErrorHandle();
	const { setPlay } = usePlayState();

	// パラメータ初期化（曲変更時）
	const initialization = () => {
		setIsInitLoad(false);
		currentTrackIdRef.current = undefined;
		beforeTrackIdRef.current = undefined;
		videoListRef.current = [];
		videoTrackQueueRef.current = [];
		setCurrentVideoIndex(null);
		setTotalVideoCount(0);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: 無限レンダリング防止のため
	useEffect(() => {
		if (!trackId) return;
		initialization();

		const initSettingPlaylist = async () => {
			const currentTrackIndex = trackQueue.findIndex(
				(track) => track.id === trackId,
			);

			if (currentTrackIndex === -1) return;

			const currentTrack = trackQueue[currentTrackIndex];
			const nextTrack = trackQueue[currentTrackIndex + 1];
			const prevTrack = trackQueue[currentTrackIndex - 1];

			// 現在再生中のVideoIdをセット
			const res = await getTopMovieBySearch(
				`${currentTrack.artist} ${currentTrack.title}`,
				errorHandling,
			);

			if (!res) return;

			videoListRef.current.push(res.videoId);
			videoTrackQueueRef.current.push({
				trackId: currentTrack.id,
				videoId: res.videoId,
			});

			if (nextTrack) {
				currentTrackIdRef.current = nextTrack.id;
				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title}`,
					errorHandling,
				);

				if (!res) return;

				videoListRef.current.push(res.videoId);
				videoTrackQueueRef.current.push({
					trackId: nextTrack.id,
					videoId: res.videoId,
				});
			}

			if (prevTrack) {
				beforeTrackIdRef.current = prevTrack.id;
				// 前の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${prevTrack.artist} ${prevTrack.title}`,
					errorHandling,
				);

				if (!res) return;

				videoListRef.current.unshift(res.videoId);
				videoTrackQueueRef.current.unshift({
					trackId: prevTrack.id,
					videoId: res.videoId,
				});
			}

			setIsInitLoad(true);
			setTrackId(null);
			setPlay(currentTrack.id);
		};

		initSettingPlaylist();
	}, [trackQueue, trackId, setTrackId]);
};
