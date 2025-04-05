"use client";

import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/navigation";

import style from "@/app/_components/client/Jacket/jacket.module.scss";
import helper from "@/app/_styles/helper.module.scss";
import Link from "next/link";

type JacketProps = ImageProps & {
	href: string;
	music?: { name: string; href: string };
	artist?: { name: string; href: string };
};

export const Jacket = ({ href, music, artist, ...props }: JacketProps) => {
	const router = useRouter();
	return (
		<div className={style.jacketWrapper}>
			<div
				style={{ width: `${props.width}px`, height: `${props.height}px` }}
				className={style.jacket}
				onClick={() => router.push(href)}
				onKeyDown={() => router.push(href)}
			>
				<Image className={style.jacketImg} {...props} alt="image" />
			</div>
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
