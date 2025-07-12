import { Artist } from "@/app/_components/server/Artist/Artist";
import style from "@/app/(static)/artists/[artist_id]/_components/artist-header.module.scss";

type ArtistHeaderProps = {
	src: string;
	alt: string;
	artistName: string;
};

export const ArtistHeader = ({ src, alt, artistName }: ArtistHeaderProps) => {
	return (
		<>
			<div className={style.artistHeader}>
				<Artist
					fill
					priority
					src={src}
					alt={alt}
					style={{ boxShadow: "var(--slate-2) 0 10px 25px" }}
				/>
			</div>
			<h1 className={style.artistText}>{artistName}</h1>
		</>
	);
};
