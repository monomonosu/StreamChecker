import { Suspense } from "react";
import { Container as ArtistAlbumContainer } from "@/app/_components/server/Jacket/Artist/Container";
import { Loading as ArtistAlbumLoading } from "@/app/_components/server/Jacket/Artist/Loading";
import { getAlbum } from "@/app/_fetchers/getAlbum";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { LinkText } from "@/app/_styles/components/texts";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import { Container as AlbumHeaderContainer } from "@/app/(static)/albums/[album_id]/_components/AlbumHeader/Container";
import { Loading as AlbumHeaderLoading } from "@/app/(static)/albums/[album_id]/_components/AlbumHeader/Loading";
import { Container as TrackListContainer } from "@/app/(static)/albums/[album_id]/_components/AlbumTrackList/Container";
import { Loading as TrackListLoading } from "@/app/(static)/albums/[album_id]/_components/AlbumTrackList/Loading";
import { PATH } from "@/utils/constants/path";

type Props = {
	params: Promise<{ album_id: string }>;
};

export default async function Album({ params }: Props) {
	const { album_id } = await params;
	const data = await getAlbum(album_id);

	return (
		<PageWrapper>
			<Section>
				<Suspense fallback={<AlbumHeaderLoading />}>
					<AlbumHeaderContainer album_id={album_id} />
				</Suspense>
			</Section>

			<Section>
				<Suspense fallback={<TrackListLoading />}>
					<TrackListContainer album_id={album_id} />
				</Suspense>
			</Section>

			<div>
				<Section>
					<h2>アーティストのその他のアルバム</h2>

					<Slider>
						<Suspense fallback={<ArtistAlbumLoading />}>
							<ArtistAlbumContainer artist_id={data.artists[0].id} />
						</Suspense>
					</Slider>

					<LinkText href={PATH.ARTIST_ALBUM(data.artists[0].id)}>
						▶︎ ReadMoreAlbums...
					</LinkText>
				</Section>
			</div>
		</PageWrapper>
	);
}
