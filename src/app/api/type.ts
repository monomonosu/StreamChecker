/**
 * APIRoute共通レスポンス
 * @typedef {Object} CustomResponse
 * @property {Array|Object|any} [data] - The data returned from the
 * @property {Object} status - The status of the response.
 * @property {number} status.code - The HTTP status code.
 * @property {string} status.message - A message describing the status.
 */
export type CustomResponse = {
	// biome-ignore lint: 汎用的に使用するため
	data?: [] | object | any;
	status: {
		code: number;
		message: string;
	};
};
