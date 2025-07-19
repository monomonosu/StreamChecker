"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Theme } from "@radix-ui/themes";
import Image from "next/image";

import style from "@/app/_components/client/FooterPlayer/footer-player.module.scss";

import { useFooterPlayer } from "@/app/_components/client/FooterPlayer/useFooterPlayer";
import { Marquee } from "@/app/_components/client/Marquee/Marquee";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

export const FooterPlayer = () => {
	const { isOpenFooter, videoTitle, videoUrl, playSource, onClickClose } =
		useFooterPlayer();

	return (
		<Theme
			className={style.footer}
			style={{ visibility: isOpenFooter ? "visible" : "hidden" }}
		>
			<div className={style.footerMovie} id="youtube-player" />

			<div className={style.footerContent}>
				<GapWrapper gap={8} style={{ flexWrap: "nowrap" }}>
					<Image
						width={24}
						height={24}
						src={playSource}
						alt="再生・停止アイコン"
					/>
					<Marquee>
						<BasicText>{videoTitle}</BasicText>
					</Marquee>
				</GapWrapper>

				<LinkText
					className="display-none-sp textEllipsis-1"
					href={videoUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					{videoUrl}
				</LinkText>
			</div>

			<div className={style.buttonWrapper}>
				<Button
					color="gray"
					variant="outline"
					radius="full"
					onClick={onClickClose}
				>
					<Cross1Icon />
				</Button>
			</div>
		</Theme>
	);
};
