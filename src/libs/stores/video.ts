import { atom } from "jotai";

/**
 * 再生中の動画のタイトル
 */
export const videoTitleAtom = atom<string>("");

/**
 * 再生中の動画のURL
 */
export const videoUrlAtom = atom<string>("");

/**
 * Footerの表示・非表示
 * @type {boolean}
 */
export const isOpenFooterAtom = atom<boolean>(false);

/**
 * トラックテーブルで選択されたトラックのID
 * @type {string}
 */
export const trackIdAtom = atom<string>("");

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
