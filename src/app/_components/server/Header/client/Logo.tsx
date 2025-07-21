"use client";

import Image from "next/image";
import { useTheme } from "@/utils/hooks/useTheme";

export const Logo = () => {
	const { theme } = useTheme();

	return (
		<>
			{theme === "dark" && (
				<>
					<Image
						className="display-none-sp"
						src="/images/logo_white.png"
						height={24}
						alt="logo"
						width={63}
					/>
					<Image
						className="display-only-sp"
						src="/images/logo_white_sp.png"
						height={24}
						alt="logo"
						width={24}
					/>
				</>
			)}

			{theme === "light" && (
				<>
					<Image
						className="display-none-sp"
						src="/images/logo_black.png"
						height={24}
						alt="logo"
						width={63}
					/>
					<Image
						className="display-only-sp"
						src="/images/logo_black_sp.png"
						height={24}
						alt="logo"
						width={24}
					/>
				</>
			)}
		</>
	);
};
