import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { themeAtom } from "@/libs/stores/theme";

export const useTheme = () => {
	const router = useRouter();
	const [theme, setTheme] = useAtom(themeAtom);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		document.cookie = `theme=${newTheme}; path=/; max-age=31536000`; // 1 year expiration
		router.refresh(); // Refresh the page to apply the new theme
	};

	const setThemeValue = (value: "dark" | "light") => {
		setTheme(value);
	};

	return {
		theme,
		toggleTheme,
		setThemeValue,
	};
};
