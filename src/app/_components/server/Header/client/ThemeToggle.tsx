"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { SegmentedControl } from "@radix-ui/themes";

import { useTheme } from "@/utils/hooks/useTheme";

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<SegmentedControl.Root defaultValue={theme} onValueChange={toggleTheme}>
			<SegmentedControl.Item value="dark">
				<MoonIcon />
			</SegmentedControl.Item>
			<SegmentedControl.Item value="light">
				<SunIcon />
			</SegmentedControl.Item>
		</SegmentedControl.Root>
	);
};
