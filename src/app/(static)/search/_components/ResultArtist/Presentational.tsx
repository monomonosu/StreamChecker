import { Artist } from "@/app/_components/server/Artist/Artist";
import type { SpotifyArtistItem } from "@/app/_fetchers/types";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { PATH } from "@/utils/constants/path";
import style from "./index.module.scss";

type Props = {
	artists: SpotifyArtistItem[];
};

export const Presentational = (props: Props) => {
	const { artists } = props;

	return (
		<>
			{artists && artists.length > 0 && (
				<Section>
					<h2>アーティスト</h2>

					<Slider>
						{artists.map((artist) => (
							<div className={style.artistWrapper} key={artist.id}>
								<Artist
									href={PATH.ARTISTS(artist.id)}
									fill
									priority
									src={
										artist.images.length
											? artist.images[0].url
											: "/images/no-image.png"
									}
									artist={{ name: artist.name, href: PATH.ARTISTS(artist.id) }}
									alt="アーティスト画像"
								/>
							</div>
						))}
					</Slider>
				</Section>
			)}

			{!artists && null}
		</>
	);
};
