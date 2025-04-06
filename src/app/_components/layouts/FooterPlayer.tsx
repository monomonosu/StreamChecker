"use client";

import { Theme } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

import { isOpenFooterAtom, videoIdAtom } from "@/libs/stores/video";

import style from "@/app/_components/layouts/footer-player.module.scss";

declare global {
	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
	}
}

export const FooterPlayer = () => {
	const isOpenFooter = useAtomValue(isOpenFooterAtom);
	const videoId = useAtomValue(videoIdAtom);
	const playerRef = useRef<YT.Player | null>(null);

	useEffect(() => {
		if (!videoId || !isOpenFooter) return;

		// 既にスクリプトがある場合は再追加しない
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
								console.log("▶️ 再生中");
								break;
							case window.YT.PlayerState.PAUSED:
								console.log("⏸ 一時停止");
								break;
							case window.YT.PlayerState.ENDED:
								console.log("⏹ 再生終了");
								break;
							default:
								console.log("📺 状態:", event.data);
						}
					},
				},
			});
		};
	}, [videoId, isOpenFooter]);

	useEffect(() => {
		if (
			playerRef.current &&
			typeof playerRef.current.loadVideoById === "function"
		) {
			playerRef.current.loadVideoById(videoId);
		}
	}, [videoId]);

	return (
		<>
			{isOpenFooter && (
				<Theme appearance="dark" className={style.footer}>
					<div id="youtube-player" />
				</Theme>
			)}
		</>
	);
};
