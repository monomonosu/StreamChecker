/**
 * msを分:秒に変換する
 * @param ms ミリ秒
 * @returns {string} 分:秒
 */
export function formatMsToMinSec(ms: number): string {
	const msToSec = Math.floor(ms / 1000);
	const min = Math.floor(msToSec / 60);
	const sec = msToSec % 60;
	return `${min}:${sec.toString().padStart(2, "0")}`;
}
