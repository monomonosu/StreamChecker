import { useAtom } from "jotai";

import { playingAtom } from "@/libs/stores/video";

export const usePlayState = () => {
	const [playing, setPlaying] = useAtom(playingAtom);

	const setPlay = (id: string | null) => {
		setPlaying({
			isPlaying: true,
			trackId: id,
		});
	};

	const setPause = () => {
		setPlaying({
			isPlaying: false,
			trackId: null,
		});
	};

	return {
		isPlaying: playing.isPlaying,
		setPlay,
		setPause,
	};
};
