import { Jacket } from "@/app/_components/server/Jacket/Jacket";

import { getAlbumsByArtist } from "@/app/_fetchers/getAlbumsByArtist";
import { getArtist } from "@/app/_fetchers/getArtist";
import { getTopTracksByArtist } from "@/app/_fetchers/getTopTracksByArtist";

import { Section, Slider } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { ArtistHeader } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader";
import { TopTrackList } from "@/app/(static)/artists/[artist_id]/_components/TopTrackList";

import { PATH } from "@/utils/constants/path";

type Props = {
	params: Promise<{ artist_id: string }>;
};

export default async function ArtistPage({ params }: Props) {
	const { artist_id } = await params;
	const artist = await getArtist(artist_id);
	const topTracks = await getTopTracksByArtist(artist_id);
	const albums = await getAlbumsByArtist(artist_id);

	return (
		<PageWrapper>
			<Section>
				<ArtistHeader
					src={
						artist.images.length ? artist.images[0].url : "/images/no-image.png"
					}
					alt={artist.name}
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
						<div style={{ width: "200px" }} key={item.id}>
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
