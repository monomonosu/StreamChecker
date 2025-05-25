import { ArtistHeader } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader";
import { TopTrackList } from "@/app/(static)/artists/[artist_id]/_components/TopTrackList";
import { Slider } from "@/app/_components/layouts/Slider";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";
import { getArtist } from "@/app/_fetchers/getArtist";
import { getTopTracksByArtist } from "@/app/_fetchers/getTopTracksByArtist";

type Props = {
	params: Promise<{ artist_id: string }>;
};

export default async function Artist({ params }: Props) {
	const { artist_id } = await params;
	const artist = await getArtist(artist_id);
	const topTracks = await getTopTracksByArtist(artist_id);
	const albums = await getAlbumsByArtist(artist_id);

	return (
		<PageWrapper>
			<Section>
				<ArtistHeader
					src={artist.images[0].url}
					alt={artist.name}
					width={artist.images[0].width}
					height={artist.images[0].height}
					artistName={artist.name}
				/>
			</Section>

			<Section>
				<h2>人気曲</h2>
				<TopTrackList topTracks={topTracks} />
			</Section>

			<Section>
				<h2>アルバム</h2>
				<Slider>
					{albums.items.map((item) => (
						<Jacket
							key={item.id}
							href={`/albums/${item.id}`}
							priority
							src={item.images[0].url}
							album={{ name: item.name, href: `/albums/${item.id}` }}
							width={200}
							height={200}
							alt="アルバム画像"
						/>
					))}
				</Slider>
			</Section>
		</PageWrapper>
	);
}
