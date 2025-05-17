import Image from "next/image";

import Link from "next/link";
import { Fragment } from "react";

import style from "@/app/(static)/albums/[album_id]/_components/album-header.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type Props = Album;

export const AlbumHeader = ({ name, artists, release_date, image }: Props) => {
	return (
		<div className={style.albumHeader}>
			<Image
				className={style.img}
				src={image.url}
				alt={name}
				width={image.width ? image.width : 0}
				height={image.height ? image.height : 0}
			/>
			<div className={style.contentWrapper}>
				<h2>{name}</h2>
				<div className={style.contentInner}>
					<div>
						{artists.map((artist, index) => (
							<Fragment key={artist.id}>
								<Link
									key={artist.id}
									href={`/artists/${artist.id}`}
									className={helper.link}
								>
									{artist.name}
								</Link>
								{index < artists.length - 1 && ","}
							</Fragment>
						))}
					</div>
					<span>{release_date}</span>
				</div>
			</div>
		</div>
	);
};
