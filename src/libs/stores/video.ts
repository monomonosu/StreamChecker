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
 * 再生中の動画のサムネイル
 */
export const videoThumbnailAtom = atom("");

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

/**
 * 連続再生キュー情報
 * @type {object[]}
 * @constant {object[]}
 * @description 連続再生キュー情報を管理する
 * @property {string} artistName アーティスト名
 * @property {string} musicName 曲名
 * @property {string} albumName アルバム名
 */
export const trackQueueAtom = atom<Track[]>([]);
