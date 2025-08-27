import { Artist } from "@/app/_components/server/Artist/Artist";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import type { SpotifySearchResponse } from "@/app/_fetchers/types";
import { Section } from "@/app/_styles/components/blocks";
import { GapWrapper } from "@/app/_styles/components/wrappers";
import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";
import style from "@/app/(static)/search/_components/ResultTop/index.module.scss";
import { PATH } from "@/utils/constants/path";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	data: SpotifySearchResponse;
};

export const Presentational = (props: Props) => {
	const { data } = props;
	const { artists, albums, tracks } = data;

	const artistItems = artists.items[0];
	const albumItems = albums.items[0];
	const trackItems = tracks.items.map((track) => ({
		id: track.id,
		title: track.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	const isExistData = data || (artistItems && albumItems && trackItems);

	return (
		<>
			{isExistData && (
				<Section>
					<h2>上位の検索結果</h2>

					<GapWrapper gap={40} direction="row">
						<GapWrapper gap={8} direction="column">
							<h3>アーティスト</h3>

							<div className={style.resultsWrapper}>
								<Artist
									href={PATH.ARTISTS(artistItems.id)}
									fill
									priority
									src={
										artistItems.images[0]
											? artistItems.images[0].url
											: "/images/no-image.png"
									}
									artist={{
										name: artistItems.name,
										href: PATH.ARTISTS(artistItems.id),
									}}
									alt="アーティスト画像"
								/>
							</div>
						</GapWrapper>

						<GapWrapper gap={8} direction="column">
							<h3>アルバム</h3>

							<div className={style.resultsWrapper}>
								<Jacket
									href={PATH.ALBUMS(albumItems.id)}
									fill
									priority
									src={
										albumItems.images[0]
											? albumItems.images[0].url
											: "/images/no-image.png"
									}
									album={{
										name: albumItems.name,
										href: PATH.ALBUMS(albumItems.id),
									}}
									alt="アルバム画像"
								/>
							</div>
						</GapWrapper>

						<GapWrapper gap={8} direction="column">
							<h3>トラック</h3>

							<TrackArea tracks={trackItems.slice(0, 5)} />
						</GapWrapper>
					</GapWrapper>
				</Section>
			)}
		</>
	);
};
