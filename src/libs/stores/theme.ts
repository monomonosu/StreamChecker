import { atom } from "jotai";

/**
 * アプリケーションのテーマ
 * @type {atom<'dark'|'light'>}
 * @description アプリケーション全体で使用するテーマを管理するためのアトム
 */
export const themeAtom = atom<Theme>("dark");
