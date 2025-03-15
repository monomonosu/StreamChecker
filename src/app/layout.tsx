import "@/styles/reset.css";
import "@radix-ui/themes/styles.css";
import "@/styles/global.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Loading } from "@/app/_components/layouts/Loading";
import { Header } from "@/app/_components/server/Header/Header";
import style from "@/app/_styles/layout.module.scss";
import { Suspense } from "react";

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
						<Suspense
							fallback={<Loading height="calc(100vh - 56px - 48px * 2)" />}
						>
							<div className={style["main-inner"]}>{children}</div>
						</Suspense>
					</div>
				</Theme>
			</body>
		</html>
	);
}
