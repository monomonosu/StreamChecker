import Image from "next/image";

import style from "@/app/(static)/artists/[artist_id]/_components/artist-header.module.scss";

type ArtistHeaderProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
	artistName: string;
};

export const ArtistHeader = ({
	src,
	alt,
	width,
	height,
	artistName,
}: ArtistHeaderProps) => {
	return (
		<div className={style.artistHeader}>
			<Image
				className={style.artistImage}
				src={src}
				alt={alt}
				width={width}
				height={height}
			/>
			<h1 className={style.artistText}>{artistName}</h1>
		</div>
	);
};
