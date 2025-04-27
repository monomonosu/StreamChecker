"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);
	const [videoId, setVideoId] = useState<string>("");
	const [nextVideoId, setNextVideoId] = useState<string>("");
	const trackQueue = useAtomValue(trackQueueAtom);
	const [globalTrackId, _setGlobalTrackId] = useAtom(trackIdAtom);
	const [trackId, setTrackId] = useState<string>("");
	const [_nextTrackId, setNextTrackId] = useState<string>("");
	const nextTrackIdRef = useRef<string>("");
	const videoIdRef = useRef<string>("");
	const videoTitle = useAtomValue(videoTitleAtom);
	const videoDescription = useAtomValue(videoDescriptionAtom);
	const playerRef = useRef<YT.Player | null>(null);

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
								const url = playerRef.current?.getVideoUrl();
								// query取得
								const id = url?.split("?v=")[1];
								if (videoIdRef.current !== id) {
									setTrackId(nextTrackIdRef.current);
								}

								break;
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
		if (!globalTrackId) return;
		setTrackId(globalTrackId);
	}, [globalTrackId]);

	useEffect(() => {
		if (
			playerRef.current &&
			typeof playerRef.current.loadVideoById === "function"
		) {
			// TODO: prevTrackボタンが押された時,動画が終了した時の考慮を追加する
			if (videoId === "") return;
			if (nextVideoId === "") return;
			playerRef.current.loadPlaylist(["bnofYmfKLeo", videoId, nextVideoId], 1);
			// 前回の値が残るのを防止
			videoIdRef.current = videoId;
			setVideoId("");
			setNextVideoId("");
		}
		// NOTE: 閉じられたFooterを再度開いた時に動画が再生されるように
		if (playerRef.current) {
			playerRef.current.playVideo();
		}
	}, [videoId, nextVideoId]);

	useEffect(() => {
		const currentTrackIndex = trackQueue.findIndex(
			(track) => track.id === trackId,
		);
		if (currentTrackIndex === -1) return;
		const currentTrack = trackQueue[currentTrackIndex];
		const nextTrack = trackQueue[currentTrackIndex + 1];
		if (!nextTrack) return;

		// 現在再生中のVideoIdをセット
		getTopMovieBySearch(
			`${currentTrack.artist} ${currentTrack.title} ${currentTrack.album}`,
		).then((res) => {
			if (!res) return;
			setVideoId(res.videoId);
		});

		// 次の動画のVideoIdをセット
		getTopMovieBySearch(
			`${nextTrack.artist} ${nextTrack.title} ${nextTrack.album}`,
		).then((res) => {
			if (!res) return;
			setNextVideoId(res.videoId);
			nextTrackIdRef.current = nextTrack.id;
			setNextTrackId(nextTrack.id);
		});
	}, [trackId, trackQueue]);

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
