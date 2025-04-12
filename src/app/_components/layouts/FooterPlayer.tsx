"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

import {
	isOpenFooterAtom,
	playStateAtom,
	videoChannelAtom,
	videoDescriptionAtom,
	videoIdAtom,
	videoThumbnailAtom,
	videoTitleAtom,
} from "@/libs/stores/video";

import style from "@/app/_components/layouts/footer-player.module.scss";

declare global {
	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
	}
}

export const FooterPlayer = () => {
	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);
	const videoId = useAtomValue(videoIdAtom);
	const videoTitle = useAtomValue(videoTitleAtom);
	const videoDescription = useAtomValue(videoDescriptionAtom);
	const videoThumbnail = useAtomValue(videoThumbnailAtom);
	const videoChannel = useAtomValue(videoChannelAtom);
	const setPlayState = useSetAtom(playStateAtom);
	const playerRef = useRef<YT.Player | null>(null);

	useEffect(() => {
		if (!videoId || !isOpenFooter) return;
		// WARNING:ダミー音声
		const audio = new Audio("/soundless.mp3");

		// NOTE:再生停止中の動画がある場合は同じ動画を再生する（Footerを閉じた時など）
		if (playerRef.current) {
			playerRef.current.playVideo();
		}

		// NOTE:既にスクリプトがある場合は再追加しない
		if (!window.YT) {
			const tag = document.createElement("script");
			tag.id = "youtube-iframe-api";
			tag.src = "https://www.youtube.com/iframe_api";
			document.body.appendChild(tag);
		}

		window.onYouTubeIframeAPIReady = () => {
			playerRef.current = new window.YT.Player("youtube-player", {
				videoId,
				playerVars: {
					autoplay: 1,
					enablejsapi: 1,
				},
				events: {
					onStateChange: (event: YT.OnStateChangeEvent) => {
						switch (event.data) {
							case window.YT.PlayerState.PLAYING:
								// ２回目の動画再生後にActionHandlerが動作しなくなるのを防ぐ
								audio.play();
								setPlayState("playing");
								break;
							case window.YT.PlayerState.PAUSED:
								audio.pause();
								setPlayState("paused");
								break;
							case window.YT.PlayerState.ENDED:
								// Youtube動画再生終了後にシークバーが復活するのを防ぐ
								audio.pause();
								setPlayState("ended");
								break;
							default:
								console.log("📺 状態:", event.data);
						}
					},
					onReady: () => {
						// HACK: Youtubeiframeではメディアセッションの制御が不可能なのでダミー音声で擬似的に制御可能とさせる
						audio.loop = true;
						audio.play();

						// HACK: シークバーを擬似的に停止状態にするため再生完了後にpausedステートにする
						audio.addEventListener("ended", () => {
							navigator.mediaSession.playbackState = "paused";
						});

						if ("mediaSession" in navigator) {
							navigator.mediaSession.metadata = new MediaMetadata({
								title: videoTitle,
								artist: videoChannel,
								artwork: [
									{
										src: videoThumbnail,
										type: "image/png",
									},
								],
							});

							navigator.mediaSession.setActionHandler("previoustrack", () => {
								console.log("⏮ Prev Track Triggered");
							});

							navigator.mediaSession.setActionHandler("nexttrack", () => {
								console.log("⏭ Next Track Triggered");
							});
						}
					},
				},
			});
		};
	}, [
		videoId,
		videoTitle,
		videoThumbnail,
		videoChannel,
		isOpenFooter,
		setPlayState,
	]);

	useEffect(() => {
		if (
			playerRef.current &&
			typeof playerRef.current.loadVideoById === "function"
		) {
			playerRef.current.loadVideoById(videoId);
		}
		// NOTE: 閉じられたFooterを再度開いた時に動画が再生されるように
		if (playerRef.current) {
			playerRef.current.playVideo();
		}
	}, [videoId]);

	// NOTE: Footerを閉じた時は動画を停止
	const onClickClose = () => {
		if (playerRef.current) {
			playerRef.current.pauseVideo();
		}
		setPlayState("paused");
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
