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
export const trackIdAtom = atom<string | null>(null);

/**
 * 連続再生キュー情報
 * @type {Track[]}
 * @property {string} id - 曲のID
 * @property {number} [index] - テーブル出力時の曲のインデックス
 * @property {string} [image] - 曲の画像URL
 * @property {string} title - 曲のタイトル
 * @property {string} [album] - アルバム名
 * @property {string} [artist] - アーティスト名
 * @property {string} [duration] - 曲の再生時間
 * @description 連続再生キュー情報を管理する
 */
export const trackQueueAtom = atom<Track[]>([]);
