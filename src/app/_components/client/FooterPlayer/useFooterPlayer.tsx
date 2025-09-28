"use client";

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

import {
	isInitVideoLoadAtom,
	isOpenFooterAtom,
	trackIdAtom,
	videoTitleAtom,
	videoUrlAtom,
} from "@/libs/stores/video";
import { useInitPlayList } from "@/libs/youtube/initPlayList";
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

	const [_trackId, setTrackId] = useAtom(trackIdAtom);
	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);
	const isInitVideoLoad = useAtomValue(isInitVideoLoadAtom);
	const videoTitle = useAtomValue(videoTitleAtom);
	const videoUrl = useAtomValue(videoUrlAtom);

	const currentTrackIdRef = useRef<string>(undefined);
	const beforeTrackIdRef = useRef<string>(undefined);
	const playerRef = useRef<YT.Player | null>(null);
	const videoListRef = useRef<string[]>([]);

	// プレイヤーiframeのセットアップ・イベント設定
	useSetUpPlayer({ playerRef, currentTrackIdRef });

	// 初回再生時(TrackQueueセット時)のプレイリスト生成
	useInitPlayList({
		currentTrackIdRef,
		beforeTrackIdRef,
		videoListRef,
	});

	// プレイリスト管理
	useSetPlayList({
		currentTrackIdRef,
		videoListRef,
		playerRef,
		beforeTrackIdRef,
	});

	// 初回再生分のプレイリストをセット
	useEffect(() => {
		if (!isInitVideoLoad || !playerRef.current) return;

		// trackQueueの先頭のインデックスが選択された時・それ以外のインデックスが選択された時の考慮
		playerRef.current.loadPlaylist(
			videoListRef.current,
			videoListRef.current.length > 2 || !currentTrackIdRef.current ? 1 : 0,
		);
	}, [isInitVideoLoad]);

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
