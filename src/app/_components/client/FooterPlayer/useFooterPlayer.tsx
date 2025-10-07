"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";

import {
	isOpenFooterAtom,
	trackIdAtom,
	videoTitleAtom,
	videoUrlAtom,
} from "@/libs/stores/video";
import { useInitPlayList } from "@/libs/youtube/initPlayList";
import { useSetInitPlayList } from "@/libs/youtube/setInitPlayList";
import { useSetPlayList } from "@/libs/youtube/setPlayList";
import { useSetUpPlayer } from "@/libs/youtube/setUpPlayer";
import { usePlayIcon } from "@/utils/hooks/usePlayIcon";

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
	const { getPlaySource } = usePlayIcon();

	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);
	const setTrackId = useSetAtom(trackIdAtom);
	const videoTitle = useAtomValue(videoTitleAtom);
	const videoUrl = useAtomValue(videoUrlAtom);

	const currentTrackIdRef = useRef<string>(undefined);
	const beforeTrackIdRef = useRef<string>(undefined);
	const playerRef = useRef<YT.Player | null>(null);
	const videoListRef = useRef<string[]>([]);
	const videoTrackQueueRef = useRef<{ trackId: string; videoId: string }[]>([]);

	// プレイヤーiframeのセットアップ・イベント設定
	useSetUpPlayer({ currentTrackIdRef, playerRef, videoTrackQueueRef });

	// 初回再生時(TrackQueueセット時)のプレイリスト生成
	useInitPlayList({
		currentTrackIdRef,
		beforeTrackIdRef,
		videoListRef,
		videoTrackQueueRef,
	});

	// 初回再生時(TrackQueueセット時)のプレイリストをセット
	useSetInitPlayList({
		currentTrackIdRef,
		playerRef,
		videoListRef,
	});

	// プレイリスト管理
	useSetPlayList({
		currentTrackIdRef,
		beforeTrackIdRef,
		playerRef,
		videoListRef,
	});

	// NOTE: Footerを閉じた時は動画を停止
	const onClickClose = () => {
		if (playerRef.current) {
			playerRef.current.pauseVideo();
		}
		setIsOpenFooter(false);
		setTrackId(null);
	};

	return {
		isOpenFooter,
		videoTitle,
		videoUrl,
		playSource: getPlaySource(),
		onClickClose,
	};
};
