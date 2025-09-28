import { atom } from "jotai";

export type PlayingState = {
	isPlaying?: boolean;
	trackId?: string | null;
};

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
 * 連続再生動画キューの再生中インデックス
 * @type {number | null}
 */
export const currentVideoIndexAtom = atom<number | null>(null);

/**
 * 連続再生動画キューの総動画数
 * @type {number}
 */
export const totalVideoCountAtom = atom<number>(0);

/**
 * 初回動画読み込み完了フラグ
 * @type {boolean}
 */
export const isInitVideoLoadAtom = atom<boolean>(false);

/**
 * 再生中の動画情報
 * @type {PlayingState}
 * @property {boolean} isPlaying - 動画が再生中かどうか
 * @property {string | null} trackId - 現在再生中のトラックのID
 * @description 再生中の動画情報を管理する
 */
export const playingAtom = atom<PlayingState>({
	isPlaying: false,
	trackId: null,
});

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
