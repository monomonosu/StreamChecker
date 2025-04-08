import { ArtistHeader } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader";
import { Section, SectionWrapper } from "@/app/_components/layouts/Section";
import { Slider } from "@/app/_components/layouts/Slider";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";

import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";
import { getArtist } from "@/app/_fetchers/getArtist";
import { getTopTracksByArtist } from "@/app/_fetchers/getTopTracksByArtist";

import { TrackArea } from "@/app/(static)/artists/[artist_id]/_components/TrackArea";

type Props = {
	params: Promise<{ artist_id: string }>;
};

export default async function Artist({ params }: Props) {
	const { artist_id } = await params;
	const artist = await getArtist(artist_id);
	const topTracks = await getTopTracksByArtist(artist_id);
	const albums = await getAlbumsByArtist(artist_id);

	return (
		<SectionWrapper>
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
				<TrackArea topTracks={topTracks} />
			</Section>

			<Section>
				<h2>アルバム</h2>
				<Slider>
					{albums.items.map((item) => (
						<Jacket
							key={item.id}
							href="/"
							priority
							src={item.images[0].url}
							album={{ name: item.name, href: item.external_urls.spotify }}
							width={200}
							height={200}
							alt="アルバム画像"
						/>
					))}
				</Slider>
			</Section>
		</SectionWrapper>
	);
}
