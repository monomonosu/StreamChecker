"use client";

import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/navigation";

import style from "@/app/_components/client/Jacket/jacket.module.scss";

type JacketProps = ImageProps & {
	href: string;
};

export const Jacket = ({ href, ...props }: JacketProps) => {
	const router = useRouter();
	return (
		<div
			style={{ width: `${props.width}px`, height: `${props.height}px` }}
			className={style.jacket}
			onClick={() => router.push(href)}
			onKeyDown={() => router.push(href)}
		>
			<Image className={style.jacketImg} {...props} alt="image" />
		</div>
	);
};
