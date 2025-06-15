"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { SegmentedControl } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export const ThemeToggle = () => {
	const router = useRouter();
	// cookieからテーマを取得
	const cookieTheme = document.cookie
		.split("; ")
		.find((row) => row.startsWith("theme="));
	const theme = cookieTheme ? cookieTheme.split("=")[1] : "dark"; // Default to 'dark' if not set

	const handleChange = (value: string) => {
		document.cookie = `theme=${value}; path=/; max-age=31536000`;
		router.refresh();
	};

	return (
		<SegmentedControl.Root defaultValue={theme} onValueChange={handleChange}>
			<SegmentedControl.Item value="dark">
				<MoonIcon />
			</SegmentedControl.Item>
			<SegmentedControl.Item value="light">
				<SunIcon />
			</SegmentedControl.Item>
		</SegmentedControl.Root>
	);
};
