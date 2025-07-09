import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { themeAtom } from "@/libs/stores/theme";

export const useTheme = () => {
	const router = useRouter();
	const [theme, setTheme] = useAtom(themeAtom);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		Cookies.set("theme", newTheme, { expires: 365 }); // Set cookie with 1 year expiration
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
