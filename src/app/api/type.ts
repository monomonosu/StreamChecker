/**
 * APIRoute共通レスポンス
 * @typedef {Object} CustomResponse
 * @template T - レスポンスデータの型
 * @property {Object} status - The status of the response.
 * @property {number} status.code - The HTTP status code.
 * @property {string} status.message - A message describing the status.
 */
export type CustomResponse<T = unknown> = {
	status: {
		code: number;
		message: string;
	};
	data?: T;
};
