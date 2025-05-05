"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";

import { useFooterPlayer } from "@/app/_components/client/FooterPlayer/useFooterPlayer";

import style from "@/app/_components/client/FooterPlayer/footer-player.module.scss";
import helper from "@/app/_styles/helper.module.scss";

export const FooterPlayer = () => {
	const { isOpenFooter, videoTitle, videoUrl, onClickClose } =
		useFooterPlayer();

	return (
		<Theme
			className={style.footer}
			appearance="dark"
			style={{ visibility: isOpenFooter ? "visible" : "hidden" }}
		>
			<div className={style.footerMovie} id="youtube-player" />
			<div className={style.footerContent}>
				<p>{videoTitle}</p>
				<Link href={videoUrl} target="_blank" className={helper.link}>
					{videoUrl}
				</Link>
			</div>
			<Button
				color="gray"
				variant="outline"
				radius="full"
				onClick={onClickClose}
			>
				<Cross1Icon />
			</Button>
		</Theme>
	);
};
