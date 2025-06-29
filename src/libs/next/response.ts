import { NextResponse } from "next/server";

import type { CustomResponse } from "@/app/api/type";

/**
 * Next.jsのレスポンスを生成するヘルパー関数
 * @param data レスポンスデータ
 * @param init レスポンスの初期化オプション
 * @returns NextResponseオブジェクト
 * @template T レスポンスデータの型
 * @example return createResponse({ status: { code: 200, message: 'Success' }, data: { id: 1, name: 'Item' } });
 */
export function createResponse<T>(
	data: CustomResponse<T>,
	init?: ResponseInit,
) {
	return NextResponse.json<CustomResponse<T>>(data, init);
}
