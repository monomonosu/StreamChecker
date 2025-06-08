import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import style from "@/app/_components/server/Genre/genre.module.scss";

type GenreProps = ImageProps & {
	href: string;
	genreName: string;
};

export const Genre = ({ href, genreName, ...props }: GenreProps) => {
	return (
		<Link href={href} className={style.genre}>
			<Image className={style.genreImg} {...props} />
			<div className={style.genreText}>{genreName}</div>
		</Link>
	);
};
