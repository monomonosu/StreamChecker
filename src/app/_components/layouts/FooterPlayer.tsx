"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import {
	isOpenFooterAtom,
	trackIdAtom,
	trackQueueAtom,
	videoDescriptionAtom,
	videoTitleAtom,
} from "@/libs/stores/video";

import style from "@/app/_components/layouts/footer-player.module.scss";
import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";

declare global {
	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
	}
}

export const FooterPlayer = () => {
	const trackQueue = useAtomValue(trackQueueAtom);
	const trackId = useAtomValue(trackIdAtom);
	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);

	const [isInitLoad, setIsInitLoad] = useState(false);

	const playingTrackIdRef = useRef<string>(undefined);
	const playerRef = useRef<YT.Player | null>(null);
	const videoListRef = useRef<string[]>([]);

	const videoTitle = useAtomValue(videoTitleAtom);
	const videoDescription = useAtomValue(videoDescriptionAtom);

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
						switch (event.data) {
							case window.YT.PlayerState.PLAYING: {
								const player = event.target;
								const currentIndex = player.getPlaylistIndex();
								const totalVideos = player.getPlaylist()?.length ?? 0;

								// NOTE: 無限レンダリング回避
								if (currentIndex + 1 < totalVideos) {
									return;
								}

								// 次の動画のストックがない場合（nextTack）
								if (currentIndex + 1 === totalVideos) {
									setCurrentIndex(currentIndex);
									setTotalVideos(totalVideos);
								}

								return;
							}
							case window.YT.PlayerState.ENDED: {
								// TODO：動画が再生終了した時に次の動画を再生する処理を追加する
								break;
							}
							default:
								console.log("📺 状態:", event.data);
						}
					},
				},
			});
		};
	}, []);

	useEffect(() => {
		if (currentIndex && currentIndex + 1 === totalVideos) {
			const beforeTrackIndex = trackQueue.findIndex(
				(track) => track.id === playingTrackIdRef.current,
			);

			const nextTrack = trackQueue[beforeTrackIndex + 1];
			if (nextTrack) {
				// 次の動画のVideoIdをセット
				getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title} ${nextTrack.album}`,
				).then((res) => {
					if (!res) return;
					playingTrackIdRef.current = nextTrack.id;
					videoListRef.current.push(res.videoId);
					playerRef.current?.loadPlaylist(videoListRef.current, currentIndex);
				});
			}
		}
	}, [trackQueue, currentIndex, totalVideos]);

	// 初回再生時
	useEffect(() => {
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
				`${currentTrack.artist} ${currentTrack.title} ${currentTrack.album}`,
			);
			if (!res) return;
			videoListRef.current.push(res.videoId);
			playingTrackIdRef.current = nextTrack.id;

			if (nextTrack) {
				// 次の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${nextTrack.artist} ${nextTrack.title} ${nextTrack.album}`,
				);
				if (!res) return;
				videoListRef.current.push(res.videoId);
			}

			if (prevTrack) {
				// 前の動画のVideoIdをセット
				const res = await getTopMovieBySearch(
					`${prevTrack.artist} ${prevTrack.title} ${prevTrack.album}`,
				);
				if (!res) return;
				videoListRef.current.unshift(res.videoId);
			}

			setIsInitLoad(true);
		};

		initSettingPlaylist();
	}, [trackQueue, trackId]);

	useEffect(() => {
		if (!isInitLoad) return;
		if (
			playerRef.current &&
			typeof playerRef.current.loadVideoById === "function"
		) {
			playerRef.current.loadPlaylist(videoListRef.current, 1);
		}
		// NOTE: 閉じられたFooterを再度開いた時に動画が再生されるように
		if (playerRef.current) {
			playerRef.current.playVideo();
		}
	}, [isInitLoad]);

	// NOTE: Footerを閉じた時は動画を停止
	const onClickClose = () => {
		if (playerRef.current) {
			playerRef.current.pauseVideo();
		}
		setIsOpenFooter(false);
	};

	return (
		<Theme
			className={style.footer}
			appearance="dark"
			style={{ visibility: isOpenFooter ? "visible" : "hidden" }}
		>
			<div className={style.footerMovie} id="youtube-player" />
			<div className={style.footerContent}>
				<p>{videoTitle}</p>
				<p>{videoDescription}</p>
			</div>
			<Button
				color="gray"
				variant="outline"
				radius="full"
				onClick={onClickClose}
			>
				<Cross1Icon />
			</Button>
		</Theme>
	);
};
