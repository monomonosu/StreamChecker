import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import style from "@/app/_components/server/Jacket/jacket.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type JacketProps = ImageProps & {
	href: string;
	music?: { name: string; href: string };
	artist?: { name: string; href: string };
};

export const Jacket = ({ href, music, artist, ...props }: JacketProps) => {
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
				<Link className={helper.textEllipsis} href={music?.href || "/404"}>
					{music?.name}
				</Link>
				<Link className={style["--gray"]} href={artist?.href || "/404"}>
					{artist?.name}
				</Link>
			</div>
		</div>
	);
};
