"use client";

import { Theme } from "@radix-ui/themes";
import { useEffect } from "react";
import { useTheme } from "@/utils/hooks/useTheme";

type Props = {
	children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
	const { theme, setThemeValue } = useTheme();

	useEffect(() => {
		const cookieTheme = document.cookie
			.split("; ")
			.find((row) => row.startsWith("theme="));
		const theme = cookieTheme ? (cookieTheme.split("=")[1] as Theme) : "dark";

		setThemeValue(theme);
	}, [setThemeValue]);

	return <Theme appearance={theme}>{children}</Theme>;
};
