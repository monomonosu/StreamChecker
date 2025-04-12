import { atom } from "jotai";

/**
 * 再生中の動画ID
 */
export const videoIdAtom = atom("");

/**
 * 再生中の動画のタイトル
 */
export const videoTitleAtom = atom("");

/**
 * 再生中の動画の説明
 */
export const videoDescriptionAtom = atom("");

/**
 * 再生中の動画のチャンネル名
 */
export const videoChannelAtom = atom("");

/**
 * Footerの表示・非表示
 * @type {boolean}
 */
export const isOpenFooterAtom = atom(false);

/**
 * 再生ステータス
 * @type {"playing" | "paused" | "ended" | "none"}
 * @constant {string}
 * @default "none"
 * @description 再生中の動画の状態を管理する
 */
export const playStateAtom = atom<"playing" | "paused" | "ended" | "none">(
	"none",
);
