import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import style from "@/app/_components/server/Artist/artist.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type ArtistProps = ImageProps & {
	href: string;
	artist?: { name: string; href: string };
};

export const Artist = ({ href, artist, ...props }: ArtistProps) => {
	return (
		<GapWrapper
			gap={8}
			direction="column"
			style={{ width: `${props.width}px` }}
		>
			<Link
				href={href}
				style={{ width: `${props.width}px`, height: `${props.height}px` }}
				className={style.artist}
			>
				<Image className={style.artistImg} {...props} alt="image" />
			</Link>
			<GapWrapper direction="column">
				<LinkText className={helper.textEllipsis} href={artist?.href || "/404"}>
					{artist?.name}
				</LinkText>
			</GapWrapper>
		</GapWrapper>
	);
};
