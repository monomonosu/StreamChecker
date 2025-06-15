import "@/styles/reset.css";
import "@radix-ui/themes/styles.css";
import "@/styles/global.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import { FooterPlayer } from "@/app/_components/client/FooterPlayer/FooterPlayer";
import { Header } from "@/app/_components/server/Header/Header";

import style from "@/app/layout.module.scss";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "StreamChecker",
	description: "音楽配信プラットフォームの配信状況をチェックしよう",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookie = await cookies();
	const theme = cookie.get("theme")?.value === "dark" ? "dark" : "light";

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Theme appearance={theme}>
					<Header />
					<div className={style.main}>
						<div className={style["main-inner"]}>{children}</div>
						<FooterPlayer />
					</div>
				</Theme>
			</body>
		</html>
	);
}
