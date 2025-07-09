import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import style from "@/app/_components/server/Artist/artist.module.scss";

import { LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import helper from "@/app/_styles/helper.module.scss";

import { PATH } from "@/utils/constants/path";

type ArtistProps = ImageProps & {
	href: string;
	artist?: { name: string; href: string };
};

export const Artist = ({ href, artist, ...props }: ArtistProps) => {
	return (
		<GapWrapper gap={8} direction="column">
			<Link href={href} className={style.artist}>
				<Image className={style.artistImg} {...props} />
			</Link>
			<GapWrapper direction="column">
				<LinkText
					href={artist?.href || PATH[404]}
					className={helper.textEllipsis}
				>
					{artist?.name}
				</LinkText>
			</GapWrapper>
		</GapWrapper>
	);
};
