"use client";

import { useAtom } from "jotai";

import { playingAtom } from "@/libs/stores/video";

export const usePlayState = () => {
	const [playing, setPlaying] = useAtom(playingAtom);

	const setPlay = (id?: string | null) => {
		setPlaying((prev) =>
			id
				? {
						isPlaying: true,
						trackId: id,
					}
				: {
						isPlaying: true,
						trackId: prev.trackId,
					},
		);
	};

	const setPause = (id?: string | null) => {
		setPlaying((prev) =>
			id
				? {
						isPlaying: false,
						trackId: id,
					}
				: {
						isPlaying: false,
						trackId: prev.trackId,
					},
		);
	};

	return {
		isPlaying: playing.isPlaying,
		playingTrackId: playing.trackId,
		setPlay,
		setPause,
	};
};
