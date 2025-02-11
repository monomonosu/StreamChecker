import "@/styles/reset.css";
import "@radix-ui/themes/styles.css";
import "@/styles/global.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/app/_components/server/Header";
import style from "@/app/_styles/layout.module.scss";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Theme appearance="dark">
					<Header />
					<div className={style.main}>
						<div className={style["main-inner"]}>{children}</div>
					</div>
				</Theme>
			</body>
		</html>
	);
}
