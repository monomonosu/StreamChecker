// global.d.ts
export {};

declare global {
	/**
	 * @type {object}
	 * @property {string} id - 曲のID
	 * @property {number} index - テーブル出力時の曲のインデックス
	 * @property {string} image - 曲の画像URL
	 * @property {string} title - 曲のタイトル
	 * @property {string} album - アルバム名
	 * @property {string} artist - アーティスト名
	 * @property {string} duration - 曲の再生時間
	 * @description トラックテーブル出力用の楽曲リストの型
	 */
	type Track = {
		id: string;
		index: number;
		image: string;
		title: string;
		album: string;
		artist: string;
		duration: string;
	};

	// 必要に応じて他の共通型もここに追加
}
