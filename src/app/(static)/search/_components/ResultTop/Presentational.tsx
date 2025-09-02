import { Container } from "@/app/_components/client/Track/Container";
import { Artist } from "@/app/_components/server/Artist/Artist";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import type {
	SpotifyAlbumItem,
	SpotifyArtistItem,
} from "@/app/_fetchers/types";
import { Section } from "@/app/_styles/components/blocks";
import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "@/app/(static)/search/_components/ResultTop/index.module.scss";
import { PATH } from "@/utils/constants/path";

type Props = {
	artist: SpotifyArtistItem;
	album: SpotifyAlbumItem;
	tracks: {
		id: string;
		title: string;
		artist: string;
		duration: string;
	}[];
};

export const Presentational = (props: Props) => {
	const { artist, album, tracks } = props;

	return (
		<Section>
			<h2>上位の検索結果</h2>

			<GapWrapper gap={40} direction="row">
				<GapWrapper gap={8} direction="column">
					<h3>アーティスト</h3>

					<div className={style.resultsWrapper}>
						<Artist
							href={PATH.ARTISTS(artist.id)}
							fill
							priority
							src={
								artist.images[0] ? artist.images[0].url : "/images/no-image.png"
							}
							artist={{
								name: artist.name,
								href: PATH.ARTISTS(artist.id),
							}}
							alt="アーティスト画像"
						/>
					</div>
				</GapWrapper>

				<GapWrapper gap={8} direction="column">
					<h3>アルバム</h3>

					<div className={style.resultsWrapper}>
						<Jacket
							href={PATH.ALBUMS(album.id)}
							fill
							priority
							src={
								album.images[0] ? album.images[0].url : "/images/no-image.png"
							}
							album={{
								name: album.name,
								href: PATH.ALBUMS(album.id),
							}}
							alt="アルバム画像"
						/>
					</div>
				</GapWrapper>

				<GapWrapper gap={8} direction="column">
					<h3>トラック</h3>

					<div className={style.column}>
						{tracks.map((track) => (
							<Container key={track.id} tracks={tracks} track={track} />
						))}
					</div>
				</GapWrapper>
			</GapWrapper>
		</Section>
	);
};
