type StatusName = "success" | "warning" | "error";

const RESPONSE_CODE: { [key: string]: { status: StatusName } } = {
	"2": { status: "success" },
	"4": { status: "warning" },
	"5": { status: "error" },
} as const;

/**
 * @description ステータスコードをステータスカテゴリ名に変換する関数
 * @param {number} statusCode ステータスコード
 * @returns {StatusName} ステータスカテゴリ名
 */
export const formatStatusCategory = (statusCode: number): StatusName => {
	return RESPONSE_CODE[statusCode?.toString().slice(0, 1)]
		?.status as StatusName;
};
