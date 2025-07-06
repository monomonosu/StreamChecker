"use client";

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import {
	isOpenFooterAtom,
	trackIdAtom,
	trackQueueAtom,
	videoTitleAtom,
	videoUrlAtom,
} from "@/libs/stores/video";

import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";
import { useErrorHandle } from "@/utils/hooks/useErrorHandle";
import { usePlayState } from "@/utils/hooks/usePlayState";
import { useTheme } from "@/utils/hooks/useTheme";

declare global {
	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
	}

	interface YTPlayerWithVideoData extends YT.Player {
		getVideoData: () => {
			title: string;
			author: string;
			video_id: string;
		};
	}
}

export const useFooterPlayer = () => {
	const { errorHandling } = useErrorHandle();
	const { theme } = useTheme();
	const { isPlaying, setPlay, setPause } = usePlayState();

	const trackQueue = useAtomValue(trackQueueAtom);
	const [trackId, setTrackId] = useAtom(trackIdAtom);
	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);

	const [isInitLoad, setIsInitLoad] = useState(false);

	const currentTrackIdRef = useRef<string>(undefined);
	const beforeTrackIdRef = useRef<string>(undefined);
	const playerRef = useRef<YT.Player | null>(null);
	const videoListRef = useRef<string[]>([]);

	const [videoTitle, setVideoTitle] = useAtom(videoTitleAtom);
	const [videoUrl, setVideoUrl] = useAtom(videoUrlAtom);

	const [currentIndex, setCurrentIndex] = useState<number | null>();
	const [totalVideos, setTotalVideos] = useState<number>(0);

	// NOTE:既にスクリプトがある場合は再追加しない
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
						console.log("📺 状態:", event.data);

						switch (event.data) {
							case window.YT.PlayerState.UNSTARTED: {
								if (!currentTrackIdRef.current && currentIndex !== 0) return;

								// 次の動画のストックがない場合（nextTack）
								if (currentIndex + 1 === totalVideos) {
									setCurrentIndex(currentIndex);
									setTotalVideos(totalVideos);
									return;
								}

								if (currentIndex === 0) {
									setCurrentIndex(currentIndex);
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
	}, [setVideoTitle, setVideoUrl, setPlay, setPause]);

	// プレイリストの動画が終了した時に次の動画を追加する
	// biome-ignore lint/correctness/useExhaustiveDependencies: 無限レンダリング防止のため
	useEffect(() => {
		const addPlaylist = async () => {
			if (currentIndex && currentIndex + 1 === totalVideos) {
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
				playerRef.current?.loadPlaylist(videoListRef.current, currentIndex);
			}

			if (currentIndex === 0) {
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
				setCurrentIndex(1);
			}
		};

		addPlaylist();
	}, [trackQueue, currentIndex, totalVideos]);

	// ------------------------------ 動画セットアップ ------------------------------
	// 初回再生時
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

			if (nextTrack) {
				currentTrackIdRef.current = nextTrack.id;
				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title}`,
					errorHandling,
				);
				if (!res) return;
				videoListRef.current.push(res.videoId);
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
			}

			setIsInitLoad(true);
			setTrackId(null);
			setPlay(currentTrack.id);
		};

		initSettingPlaylist();
	}, [trackQueue, trackId, setTrackId]);

	// 初回再生分のプレイリストをセット
	useEffect(() => {
		if (!isInitLoad || !playerRef.current) return;

		// trackQueueの先頭のインデックスが選択された時・それ以外のインデックスが選択された時の考慮
		playerRef.current.loadPlaylist(
			videoListRef.current,
			videoListRef.current.length > 2 || !currentTrackIdRef.current ? 1 : 0,
		);
	}, [isInitLoad]);

	// パラメータ初期化（曲変更時）
	const initialization = () => {
		setIsInitLoad(false);
		currentTrackIdRef.current = undefined;
		beforeTrackIdRef.current = undefined;
		videoListRef.current = [];
		setCurrentIndex(null);
		setTotalVideos(0);
	};

	// NOTE: Footerを閉じた時は動画を停止
	const onClickClose = () => {
		if (playerRef.current) {
			playerRef.current.pauseVideo();
		}
		setIsOpenFooter(false);
		setTrackId(null);
	};

	return {
		theme,
		isOpenFooter,
		isPlaying,
		videoTitle,
		videoUrl,
		onClickClose,
	};
};
