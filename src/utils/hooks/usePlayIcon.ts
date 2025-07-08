import { usePlayState } from "@/utils/hooks/usePlayState";
import { useTheme } from "@/utils/hooks/useTheme";

export type PlaySource =
	| "/anime/wave_white.gif"
	| "/anime/wave_black.gif"
	| "/images/wave_white.png"
	| "/images/wave_black.png"
	| "";

export const usePlayIcon = () => {
	const { isPlaying } = usePlayState();
	const { theme } = useTheme();

	/**
	 * @returns 再生中の動画のアニメーションソースを返す
	 * @description 動画のテーマに応じて、再生中のアニメーションソースを返す
	 * - ダークテーマで再生中: `/anime/wave_white.gif`
	 * - ダークテーマで停止中: `/images/wave_white.png`
	 * - ライトテーマで再生中: `/anime/wave_black.gif`
	 * - ライトテーマで停止中: `/images/wave_black.png`
	 */
	const getPlaySource = (): PlaySource => {
		if (theme === "dark" && isPlaying) {
			return "/anime/wave_white.gif";
		}
		if (theme === "dark" && !isPlaying) {
			return "/images/wave_white.png";
		}
		if (theme === "light" && isPlaying) {
			return "/anime/wave_black.gif";
		}
		if (theme === "light" && !isPlaying) {
			return "/images/wave_black.png";
		}
		return "";
	};

	return {
		getPlaySource,
	};
};
