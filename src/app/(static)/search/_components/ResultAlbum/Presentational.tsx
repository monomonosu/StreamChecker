import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import type { SpotifyAlbumItem } from "@/app/_fetchers/types";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { PATH } from "@/utils/constants/path";
import style from "./index.module.scss";

type Props = {
	albums: SpotifyAlbumItem[];
};

export const Presentational = (props: Props) => {
	const { albums } = props;

	return (
		<>
			{albums && albums.length > 0 && (
				<Section>
					<h2>アルバム</h2>

					<Slider>
						{albums.map((album) => (
							<div className={style.jacketWrapper} key={album.id}>
								<Jacket
									href={PATH.ALBUMS(album.id)}
									fill
									priority
									src={
										album.images.length
											? album.images[0].url
											: "/images/no-image.png"
									}
									album={{ name: album.name, href: PATH.ALBUMS(album.id) }}
									alt="アルバム画像"
								/>
							</div>
						))}
					</Slider>
				</Section>
			)}
		</>
	);
};
