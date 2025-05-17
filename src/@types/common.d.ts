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
		index?: number;
		image?: string;
		title: string;
		album?: string;
		artist?: string;
		duration?: string;
	};

	/**
	 * @type {object}
	 * @property {string} id - アルバムのID
	 * @property {string} name - アルバムの名前
	 * @property {Array<{ id: string; name: string }>} artists - アルバムのアーティスト情報
	 * @property {string} release_date - アルバムのリリース日
	 * @property {object} image - アルバムの画像情報
	 * @property {string} image.url - アルバムの画像URL
	 * @property {number} image.width - アルバムの画像の幅
	 * @property {number} image.height - アルバムの画像の高さ
	 * @description アルバムの情報を管理する型
	 */
	export type Album = {
		id: string;
		name: string;
		artists: { id: string; name: string }[];
		release_date: string;
		image: { url: string; width: number | null; height: number | null };
	};
}
