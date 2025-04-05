"use client";

import { Theme } from "@radix-ui/themes";
import { useAtomValue } from "jotai";

import { isOpenFooterAtom, videoIdAtom } from "@/libs/stores/video";

import style from "@/app/_components/layouts/footer-player.module.scss";

type Props = {
	height: number;
	width: number;
};

export const FooterPlayer = ({ height = 280, width = 140 }: Props) => {
	const isOpenFooter = useAtomValue(isOpenFooterAtom);
	const videoId = useAtomValue(videoIdAtom);
	const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

	return (
		<>
			{isOpenFooter && (
				<Theme appearance="dark" className={style.footer}>
					<iframe
						width={width}
						height={height}
						src={embedUrl}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					/>
				</Theme>
			)}
		</>
	);
};
