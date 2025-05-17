import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import style from "@/app/_components/server/Jacket/jacket.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type JacketProps = ImageProps & {
	href: string;
	album?: { name: string; href: string };
	artist?: { name: string; href: string };
};

export const Jacket = ({ href, album, artist, ...props }: JacketProps) => {
	return (
		<div className={style.jacketWrapper}>
			<Link
				href={href}
				style={{ width: `${props.width}px`, height: `${props.height}px` }}
				className={style.jacket}
			>
				<Image className={style.jacketImg} {...props} alt="image" />
			</Link>
			<div className={style.jacketInfo}>
				<Link className={helper.textEllipsis} href={album?.href || "/404"}>
					{album?.name}
				</Link>
				<Link className={helper.link} href={artist?.href || "/404"}>
					{artist?.name}
				</Link>
			</div>
		</div>
	);
};
