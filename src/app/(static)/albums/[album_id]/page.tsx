import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { getAlbum } from "@/app/_fetchers/getAlbum";
import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";

import { Section, Slider } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import { Container as AlbumHeaderContainer } from "@/app/(static)/albums/[album_id]/_components/AlbumHeader/Container";
import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";

import style from "@/app/(static)/albums/[album_id]/index.module.scss";

import { PATH } from "@/utils/constants/path";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	params: Promise<{ album_id: string }>;
};

export default async function Album({ params }: Props) {
	const { album_id } = await params;
	const data = await getAlbum(album_id);
	const artistAlbumsData = await getAlbumsByArtist(data.artists[0].id);

	const tracks = data.tracks.items.map((track) => ({
		id: track.id,
		title: track.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	return (
		<PageWrapper>
			<Section>
				<AlbumHeaderContainer album_id={album_id} />
			</Section>

			<Section>
				<TrackArea tracks={tracks} />
			</Section>

			<Section>
				<h2>アーティストのその他のアルバム</h2>
				<Slider>
					{artistAlbumsData.items.map((item) => (
						<div className={style.jacketWrapper} key={item.id}>
							<Jacket
								href={PATH.ALBUMS(item.id)}
								fill
								priority
								src={
									item.images.length
										? item.images[0].url
										: "/images/no-image.png"
								}
								album={{ name: item.name, href: PATH.ALBUMS(item.id) }}
								alt="アルバム画像"
							/>
						</div>
					))}
				</Slider>
			</Section>
		</PageWrapper>
	);
}
