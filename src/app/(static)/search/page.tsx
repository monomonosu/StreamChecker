import { Suspense } from "react";
import { Artist } from "@/app/_components/server/Artist/Artist";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";
import { Container as ResultTopContainer } from "@/app/(static)/search/_components/ResultTop/Container";
import { Loading } from "@/app/(static)/search/_components/ResultTop/Loading";
import { SearchForm } from "@/app/(static)/search/_components/SearchForm";
import style from "@/app/(static)/search/index.module.scss";
import { PATH } from "@/utils/constants/path";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

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

	const artists = data.artists.items;
	const albums = data.albums.items;
	const tracks = data.tracks.items.map((track) => ({
		id: track.id,
		title: track.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	return (
		<PageWrapper>
			{query && (
				<>
					<Section>
						<h1>次の検索結果を表示しています："{query}"</h1>
					</Section>

					<Suspense fallback={<Loading />}>
						<ResultTopContainer query={query} />
					</Suspense>

					{artists.length > 0 && (
						<Section>
							<h2>アーティスト</h2>
							<Slider>
								{artists.map((artist) => (
									<div className={style.artistWrapper} key={artist.id}>
										<Artist
											href={PATH.ARTISTS(artist.id)}
											fill
											priority
											src={
												artist.images.length
													? artist.images[0].url
													: "/images/no-image.png"
											}
											artist={{
												name: artist.name,
												href: PATH.ARTISTS(artist.id),
											}}
											alt="アーティスト画像"
										/>
									</div>
								))}
							</Slider>
						</Section>
					)}

					{albums.length > 0 && (
						<Section>
							<h2>アルバム</h2>
							<Slider>
								{albums.map((album) => (
									<div className={style.jacketWrapper} key={album.id}>
										<Jacket
											href={PATH.ALBUMS(album.id)}
											fill
											priority
											src={
												album.images.length
													? album.images[0].url
													: "/images/no-image.png"
											}
											album={{ name: album.name, href: PATH.ALBUMS(album.id) }}
											alt="アルバム画像"
										/>
									</div>
								))}
							</Slider>
						</Section>
					)}

					{tracks.length > 0 && (
						<Section>
							<h2>トラック</h2>
							<TrackArea tracks={tracks} />
						</Section>
					)}
				</>
			)}
		</PageWrapper>
	);
}
