import { Suspense } from "react";
import { Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import { Container as NonResultContainer } from "@/app/(static)/search/_components/NonResult/Container";
import { Container as ResultAlbumsContainer } from "@/app/(static)/search/_components/ResultAlbum/Container";
import { Loading as ResultAlbumsLoading } from "@/app/(static)/search/_components/ResultAlbum/Loading";
import { Container as ResultArtistsContainer } from "@/app/(static)/search/_components/ResultArtist/Container";
import { Loading as ResultArtistsLoading } from "@/app/(static)/search/_components/ResultArtist/Loading";
import { Container as ResultTopContainer } from "@/app/(static)/search/_components/ResultTop/Container";
import { Loading as ResultTopLoading } from "@/app/(static)/search/_components/ResultTop/Loading";
import { Container as ResultTrackContainer } from "@/app/(static)/search/_components/ResultTrack/Container";
import { Loading as ResultTrackLoading } from "@/app/(static)/search/_components/ResultTrack/Loading";
import { SearchForm } from "@/app/(static)/search/_components/SearchForm";

type Props = {
	searchParams: Promise<{ query?: string }>;
};

export default async function Search({ searchParams }: Props) {
	const { query } = await searchParams;

	return (
		<PageWrapper>
			{!query && (
				<Section>
					<h1>お気に入りのアーティスト・曲・アルバムを探しましょう！</h1>
					<SearchForm />
				</Section>
			)}

			{query && (
				<>
					<Section>
						<h1>次の検索結果を表示しています："{query}"</h1>
					</Section>

					<Suspense fallback={<ResultTopLoading />}>
						<ResultTopContainer query={query} />
					</Suspense>

					<Suspense fallback={<ResultArtistsLoading />}>
						<ResultArtistsContainer query={query} />
					</Suspense>

					<Suspense fallback={<ResultAlbumsLoading />}>
						<ResultAlbumsContainer query={query} />
					</Suspense>

					<Suspense fallback={<ResultTrackLoading />}>
						<ResultTrackContainer query={query} />
					</Suspense>

					<NonResultContainer query={query} />
				</>
			)}
		</PageWrapper>
	);
}
