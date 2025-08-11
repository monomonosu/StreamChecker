"use server";

import { Suspense } from "react";

import { Container as ArtistAlbumContainer } from "@/app/_components/server/Jacket/Artist/Container";
import { Loading as ArtistAlbumLoading } from "@/app/_components/server/Jacket/Artist/Loading";

import { Section, Slider } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { Container as ArtistHeaderContainer } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader/Container";
import { Loading as ArtistHeaderLoading } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader/Loading";

import { Container as TopTracksContainer } from "@/app/(static)/artists/[artist_id]/_components/Track/TopTrackList/Container";
import { Loading } from "@/app/(static)/artists/[artist_id]/_components/Track/TopTrackList/Loading";

type Props = {
	params: Promise<{ artist_id: string }>;
};

export default async function ArtistPage({ params }: Props) {
	const { artist_id } = await params;

	return (
		<PageWrapper>
			<Section>
				<Suspense fallback={<ArtistHeaderLoading />}>
					<ArtistHeaderContainer artist_id={artist_id} />
				</Suspense>
			</Section>

			<Section>
				<h2>人気曲</h2>
				<Suspense fallback={<Loading />}>
					<TopTracksContainer artist_id={artist_id} />
				</Suspense>
			</Section>

			<Section>
				<h2>アルバム</h2>
				<Slider>
					<Suspense fallback={<ArtistAlbumLoading />}>
						<ArtistAlbumContainer artist_id={artist_id} />
					</Suspense>
				</Slider>
			</Section>
		</PageWrapper>
	);
}
