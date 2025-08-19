import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import style from "@/app/_components/server/Artist/artist.module.scss";

import { LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import { PATH } from "@/utils/constants/path";

type ArtistProps = ImageProps & {
	href?: string;
	artist?: { name: string; href: string };
};

export const Artist = ({ href, artist, ...props }: ArtistProps) => {
	return (
		<GapWrapper gap={8} direction="column">
			{href && (
				<Link href={href} className={style.artist} prefetch={false}>
					<Image className={style.artistImg} {...props} unoptimized />
				</Link>
			)}

			{!href && <Image className={style.artistImg} {...props} unoptimized />}

			<GapWrapper direction="column">
				<LinkText
					href={artist?.href || PATH[404]}
					className="textEllipsis-2"
					prefetch={false}
				>
					{artist?.name}
				</LinkText>
			</GapWrapper>
		</GapWrapper>
	);
};
