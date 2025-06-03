import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import style from "@/app/_components/server/Jacket/jacket.module.scss";
import helper from "@/app/_styles/helper.module.scss";

import { PATH } from "@/utils/constants/path";

type JacketProps = ImageProps & {
	href: string;
	album?: { name: string; href: string };
	artist?: { name: string; href: string };
};

export const Jacket = ({ href, album, artist, ...props }: JacketProps) => {
	return (
		<GapWrapper
			gap={8}
			direction="column"
			style={{ width: `${props.width}px` }}
		>
			<Link
				href={href}
				style={{ width: `${props.width}px`, height: `${props.height}px` }}
				className={style.jacket}
			>
				<Image className={style.jacketImg} {...props} alt="image" />
			</Link>
			<GapWrapper direction="column">
				<LinkText
					href={album?.href || PATH[404]}
					className={helper.textEllipsis}
					color="var(--slate-12)"
				>
					{album?.name}
				</LinkText>
				<LinkText href={artist?.href || PATH[404]}>{artist?.name}</LinkText>
			</GapWrapper>
		</GapWrapper>
	);
};
