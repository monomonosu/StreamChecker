"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { getTopMovieBySearch } from "@/app/_fetchers/youtube/getTopMovieBySearch";

import {
	currentVideoIndexAtom,
	isOpenFooterAtom,
	totalVideoCountAtom,
	trackIdAtom,
	trackQueueAtom,
	videoTitleAtom,
	videoUrlAtom,
} from "@/libs/stores/video";

import { useSetPlayList } from "@/libs/youtube/setPlayList";
import { useSetUpPlayer } from "@/libs/youtube/setUpPlayer";
import { useErrorHandle } from "@/utils/hooks/useErrorHandle";
import { usePlayIcon } from "@/utils/hooks/usePlayIcon";
import { usePlayState } from "@/utils/hooks/usePlayState";

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
	const { setPlay } = usePlayState();
	const { getPlaySource } = usePlayIcon();

	const trackQueue = useAtomValue(trackQueueAtom);
	const [trackId, setTrackId] = useAtom(trackIdAtom);
	const [isOpenFooter, setIsOpenFooter] = useAtom(isOpenFooterAtom);

	const [isInitLoad, setIsInitLoad] = useState(false);

	const currentTrackIdRef = useRef<string>(undefined);
	const beforeTrackIdRef = useRef<string>(undefined);
	const playerRef = useRef<YT.Player | null>(null);
	const videoListRef = useRef<string[]>([]);

	// プレイヤーiframeのセットアップ・イベント設定
	useSetUpPlayer({ playerRef, currentTrackIdRef });
	// プレイリスト管理
	useSetPlayList({
		currentTrackIdRef,
		videoListRef,
		playerRef,
		beforeTrackIdRef,
	});

	const videoTitle = useAtomValue(videoTitleAtom);
	const videoUrl = useAtomValue(videoUrlAtom);
	// TODO: currentIndex->currentVideoIndex,totalVideos->totalVideoCountに命名を変更する
	const setCurrentIndex = useSetAtom(currentVideoIndexAtom);
	const setTotalVideos = useSetAtom(totalVideoCountAtom);

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
		isOpenFooter,
		videoTitle,
		videoUrl,
		playSource: getPlaySource(),
		onClickClose,
	};
};
