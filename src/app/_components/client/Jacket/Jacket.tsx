"use client";

import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/navigation";

import style from "@/app/_components/client/Jacket/jacket.module.scss";

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
				<a href={music?.href}>{music?.name}</a>
				<a href={artist?.href}>{artist?.name}</a>
			</div>
		</div>
	);
};
