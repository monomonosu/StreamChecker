import { atom } from "jotai";

// 再生中の動画ID
export const videoIdAtom = atom("");

// 再生中の動画のタイトル・説明
export const videoTitleAtom = atom("");
export const videoDescriptionAtom = atom("");

// 開閉状態
export const isOpenFooterAtom = atom(false);

// 再生ステータス（次の動画に飛ぶ・停止中など）
export const playStateAtom = atom<"playing" | "paused" | "ended" | "none">(
	"none",
);
