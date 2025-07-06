"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

import { useFooterPlayer } from "@/app/_components/client/FooterPlayer/useFooterPlayer";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import style from "@/app/_components/client/FooterPlayer/footer-player.module.scss";

export const FooterPlayer = () => {
	const { isOpenFooter, videoTitle, videoUrl, onClickClose, getPlaySource } =
		useFooterPlayer();

	return (
		<Theme
			className={style.footer}
			style={{ visibility: isOpenFooter ? "visible" : "hidden" }}
		>
			<div className={style.footerMovie} id="youtube-player" />
			<div className={style.footerContent}>
				<GapWrapper gap={8}>
					<Image
						width={24}
						height={24}
						src={getPlaySource()}
						alt="再生・停止アイコン"
					/>
					<BasicText>{videoTitle}</BasicText>
				</GapWrapper>

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
