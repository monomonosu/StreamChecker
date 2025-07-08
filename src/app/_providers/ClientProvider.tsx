"use client";

import { useEffect } from "react";

import { useTheme } from "@/utils/hooks/useTheme";

export const ClientProvider = () => {
	// ページ読み込み時にCookieからテーマをAtomにセット
	const { setThemeValue } = useTheme();

	useEffect(() => {
		const cookieTheme = document.cookie
			.split("; ")
			.find((row) => row.startsWith("theme="));
		const theme = cookieTheme ? (cookieTheme.split("=")[1] as Theme) : "dark"; // Default to 'dark' if not set

		setThemeValue(theme);
	}, [setThemeValue]);

	return null;
};
