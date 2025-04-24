"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

import {
	isOpenFooterAtom,
	playStateAtom,
	videoDescriptionAtom,
	videoIdAtom,
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
	const setPlayState = useSetAtom(playStateAtom);
	const playerRef = useRef<YT.Player | null>(null);

	useEffect(() => {
		if (!videoId || !isOpenFooter) return;

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
				},
				events: {
					onStateChange: (event: YT.OnStateChangeEvent) => {
						switch (event.data) {
							case window.YT.PlayerState.PLAYING:
								setPlayState("playing");
								break;
							case window.YT.PlayerState.PAUSED:
								setPlayState("paused");
								break;
							case window.YT.PlayerState.ENDED:
								setPlayState("ended");
								break;
							default:
								console.log("📺 状態:", event.data);
						}
					},
				},
			});
		};
	}, [videoId, isOpenFooter, setPlayState]);

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
