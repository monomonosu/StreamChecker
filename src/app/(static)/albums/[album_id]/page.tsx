import { AlbumHeader } from "@/app/(static)/albums/[album_id]/_components/AlbumHeader";
import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { getAlbum } from "@/app/_fetchers/getAlbum";
import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	params: Promise<{ album_id: string }>;
};

export default async function Album({ params }: Props) {
	const { album_id } = await params;
	const data = await getAlbum(album_id);
	const artistAlbumsData = await getAlbumsByArtist(data.artists[0].id);

	const album: Album = {
		id: data.id,
		name: data.name,
		artists: data.artists,
		image: data.images[1],
		release_date: data.release_date,
	};

	const tracks = data.tracks.items.map((track) => ({
		id: track.id,
		title: track.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	return (
		<>
			<PageWrapper>
				<Section>
					<AlbumHeader
						id={album.id}
						name={album.name}
						artists={album.artists}
						release_date={album.release_date}
						image={{
							url: album.image.url ? album.image.url : "/images/no-image.png",
							width: 300,
							height: 300,
						}}
					/>
				</Section>

				<Section>
					<TrackArea tracks={tracks} />
				</Section>

				<Section>
					<h2>アーティストのその他のアルバム</h2>
					<Slider>
						{artistAlbumsData.items.map((item) => (
							<Jacket
								key={item.id}
								href={`/albums/${item.id}`}
								priority
								src={
									item.images.length
										? item.images[0].url
										: "/images/no-image.png"
								}
								album={{ name: item.name, href: `/albums/${item.id}` }}
								width={200}
								height={200}
								alt="アルバム画像"
							/>
						))}
					</Slider>
				</Section>
			</PageWrapper>
		</>
	);
}
