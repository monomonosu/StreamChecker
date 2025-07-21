"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { SegmentedControl } from "@radix-ui/themes";

import type { FC, HTMLAttributes } from "react";

import { useTheme } from "@/utils/hooks/useTheme";

export const ThemeToggle: FC<HTMLAttributes<HTMLDivElement>> = ({
	...props
}) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<SegmentedControl.Root
			{...props}
			defaultValue={theme}
			onValueChange={toggleTheme}
		>
			<SegmentedControl.Item value="dark">
				<MoonIcon />
			</SegmentedControl.Item>
			<SegmentedControl.Item value="light">
				<SunIcon />
			</SegmentedControl.Item>
		</SegmentedControl.Root>
	);
};
