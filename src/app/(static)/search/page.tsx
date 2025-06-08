import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";
import { SearchForm } from "@/app/(static)/search/_components/SearchForm";
import { Artist } from "@/app/_components/server/Artist/Artist";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { GapWrapper, PageWrapper } from "@/app/_styles/components/wrappers";

import { getSearchItems } from "@/app/_fetchers/getSearchItems";
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

					<Section>
						<h2>上位の検索結果</h2>

						<GapWrapper gap={40} direction="row">
							{artists?.length > 0 && (
								<GapWrapper gap={8} direction="column">
									<h3>アーティスト</h3>
									<Artist
										href={PATH.ARTISTS(artists[0].id)}
										src={
											artists[0].images.length
												? artists[0].images[0].url
												: "/images/no-image.png"
										}
										artist={{
											name: artists[0].name,
											href: PATH.ARTISTS(artists[0].id),
										}}
										width={200}
										height={200}
										alt="アーティスト画像"
									/>
								</GapWrapper>
							)}

							{albums?.length > 0 && (
								<GapWrapper gap={8} direction="column">
									<h3>アルバム</h3>
									<div style={{ width: "200px" }}>
										<Jacket
											href={PATH.ALBUMS(albums[0].id)}
											fill
											priority
											src={
												albums[0].images.length
													? albums[0].images[0].url
													: "/images/no-image.png"
											}
											album={{
												name: albums[0].name,
												href: PATH.ALBUMS(albums[0].id),
											}}
											alt="アルバム画像"
										/>
									</div>
								</GapWrapper>
							)}

							{tracks.length > 0 && (
								<GapWrapper gap={8} direction="column">
									<h3>トラック</h3>
									<TrackArea tracks={tracks.slice(0, 5)} />
								</GapWrapper>
							)}
						</GapWrapper>
					</Section>

					{artists.length > 0 && (
						<Section>
							<h2>アーティスト</h2>
							<Slider>
								{artists.map((artist) => (
									<Artist
										key={artist.id}
										href={PATH.ARTISTS(artist.id)}
										src={
											artist.images.length
												? artist.images[0].url
												: "/images/no-image.png"
										}
										artist={{
											name: artist.name,
											href: PATH.ARTISTS(artist.id),
										}}
										width={150}
										height={150}
										alt="アーティスト画像"
									/>
								))}
							</Slider>
						</Section>
					)}

					{albums.length > 0 && (
						<Section>
							<h2>アルバム</h2>
							<Slider>
								{albums.map((album) => (
									<div style={{ width: "200px" }} key={album.id}>
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
