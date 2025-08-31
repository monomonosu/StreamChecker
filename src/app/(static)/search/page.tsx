import { Suspense } from "react";
import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";
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
	if (!query) {
		return (
			<Section>
				<h1>お気に入りのアーティスト・曲・アルバムを探しましょう！</h1>
				<SearchForm />
			</Section>
		);
	}

	const data = query ? await getSearchItems(query) : null;
	if (
		!data ||
		(data.artists.items.length === 0 &&
			data.albums.items.length === 0 &&
			data.tracks.items.length === 0)
	) {
		return (
			<Section>
				<h1>
					お探しのものが見つからないようです。条件を変更して再度検索してください。
				</h1>
				<SearchForm />
			</Section>
		);
	}

	return (
		<PageWrapper>
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
				</>
			)}
		</PageWrapper>
	);
}
