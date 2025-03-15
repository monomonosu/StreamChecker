"use client";

import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/navigation";

import style from "@/app/_components/client/Genre/genre.module.scss";

type GenreProps = ImageProps & {
	href: string;
	genreName: string;
};

export const Genre = ({ href, genreName, ...props }: GenreProps) => {
	const router = useRouter();
	return (
		<div
			style={{ width: `${props.width}px`, height: `${props.height}px` }}
			className={style.genre}
			onClick={() => router.push(href)}
			onKeyDown={() => router.push(href)}
		>
			<Image className={style.genreImg} {...props} alt="image" />
			<div className={style.genreText}>{genreName}</div>
		</div>
	);
};
