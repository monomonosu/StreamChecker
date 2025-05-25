"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";

import { useFooterPlayer } from "@/app/_components/client/FooterPlayer/useFooterPlayer";
import { BasicText, LinkText } from "@/app/_styles/components/texts";

import style from "@/app/_components/client/FooterPlayer/footer-player.module.scss";

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
				<BasicText>{videoTitle}</BasicText>
				<LinkText href={videoUrl} target="_blank" rel="noopener noreferrer">
					{videoUrl}
				</LinkText>
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
