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
	const trackQueue = useAtomValue(trackQueueAtom);
	const trackId = useAtomValue(trackIdAtom);
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
		// NOTE:再生停止中の動画がある場合は同じ動画を再生する（Footerを閉じた時など）
		if (playerRef.current && playerRef.current.getPlayerState() === 2) {
			playerRef.current.playVideo();
		}

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
					enablejsapi: 1,
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
						}
					},
				},
			});
		};
	}, [setVideoTitle, setVideoUrl]);

	// プレイリストの動画が終了した時に次の動画を追加する
	useEffect(() => {
		const addPlaylist = async () => {
			if (currentIndex && currentIndex + 1 === totalVideos) {
				const currentTrackIndex = trackQueue.findIndex(
					(track) => track.id === currentTrackIdRef.current,
				);
				const nextTrack = trackQueue[currentTrackIndex + 1];

				if (!nextTrack) return;

				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title}`,
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
	useEffect(() => {
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
			);
			if (!res) return;
			videoListRef.current.push(res.videoId);

			if (nextTrack) {
				currentTrackIdRef.current = nextTrack.id;
				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title}`,
				);
				if (!res) return;
				videoListRef.current.push(res.videoId);
			}

			if (prevTrack) {
				beforeTrackIdRef.current = prevTrack.id;
				// 前の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${prevTrack.artist} ${prevTrack.title}`,
				);
				if (!res) return;
				videoListRef.current.unshift(res.videoId);
			}

			setIsInitLoad(true);
		};

		initSettingPlaylist();
	}, [trackQueue, trackId]);

	// 初回再生分のプレイリストをセット
	useEffect(() => {
		if (!isInitLoad) return;
		if (
			playerRef.current &&
			typeof playerRef.current.loadVideoById === "function"
		) {
			// trackQueueの先頭のインデックスが選択された時・それ以外のインデックスが選択された時の考慮
			playerRef.current.loadPlaylist(
				videoListRef.current,
				videoListRef.current.length > 2 || !currentTrackIdRef.current ? 1 : 0,
			);
		}
		// NOTE: 閉じられたFooterを再度開いた時に動画が再生されるように
		if (playerRef.current) {
			playerRef.current.playVideo();
		}
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
	};

	return {
		isOpenFooter,
		videoTitle,
		videoUrl,
		onClickClose,
	};
};
