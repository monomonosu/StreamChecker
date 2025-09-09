import { Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import { Container } from "@/app/(static)/artists/[artist_id]/albums/_components/Albums/Container";
import { Container as TitleContainer } from "@/app/(static)/artists/[artist_id]/albums/_components/ArtistAlbumTitle/Container";

type Props = {
	params: Promise<{ artist_id: string }>;
};

export default async function ArtistAlbumsPage({ params }: Props) {
	const { artist_id } = await params;

	return (
		<PageWrapper>
			<Section>
				<TitleContainer artist_id={artist_id} />

				<Container artist_id={artist_id} />
			</Section>
		</PageWrapper>
	);
}
