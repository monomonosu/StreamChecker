"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";

import style from "@/app/_components/layouts/footer-player.module.scss";
import { useFooterPlayer } from "@/app/_components/layouts/useFooterPlayer";

export const FooterPlayer = () => {
	const { isOpenFooter, videoTitle, onClickClose } = useFooterPlayer();

	return (
		<Theme
			className={style.footer}
			appearance="dark"
			style={{ visibility: isOpenFooter ? "visible" : "hidden" }}
		>
			<div className={style.footerMovie} id="youtube-player" />
			<div className={style.footerContent}>
				<p>{videoTitle}</p>
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
