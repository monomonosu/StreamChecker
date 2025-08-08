import { Artist } from "@/app/_components/server/Artist/Artist";
import type { SpotifyArtistResponse } from "@/app/_fetchers/types";
import style from "./index.module.scss";

type Props = {
	artistData: SpotifyArtistResponse;
};

export const Presentational = (props: Props) => {
	const { artistData } = props;

	return (
		<>
			<div className={style.artistHeader}>
				<Artist
					fill
					priority
					src={artistData.images[0].url}
					alt={`${artistData.name}の画像`}
					style={{ boxShadow: "var(--slate-2) 0 10px 25px" }}
				/>
			</div>
			<h1 className={style.artistText}>{artistData.name}</h1>
		</>
	);
};
