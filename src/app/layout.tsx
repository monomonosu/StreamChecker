import "@/styles/main.scss";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { FooterPlayer } from "@/app/_components/client/FooterPlayer/FooterPlayer";
import { Header } from "@/app/_components/server/Header/Header";

import { GlobalSnackbar } from "@/app/_providers/GlobalSnackbar";
import { ThemeProvider } from "@/app/_providers/ThemeProvider";

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
	const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				{gaId && <GoogleAnalytics gaId={gaId} />}

				<ThemeProvider>
					<GlobalSnackbar />
					<Header />
					{children}
					<FooterPlayer />
				</ThemeProvider>
			</body>
		</html>
	);
}
