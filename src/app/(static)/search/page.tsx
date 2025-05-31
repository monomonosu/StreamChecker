import { MagnifyingGlassIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import Form from "next/form";

import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";
import { Artist } from "@/app/_components/server/Artist/Artist";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section } from "@/app/_styles/components/blocks";
import { GapWrapper, PageWrapper } from "@/app/_styles/components/wrappers";

import { getSearchItems } from "@/app/_fetchers/getSearchItems";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	searchParams: Promise<{ query?: string }>;
};

export default async function Search({ searchParams }: Props) {
	const { query } = await searchParams;

	const data = query ? await getSearchItems(query) : null;
	if (!data) {
		return (
			<h1>
				お探しのものが見つからないようです。条件を変更して再度検索してください。
			</h1>
		);
	}

	const artists = data.artists.items;
	const albums = data.albums.items;
	const tracks = data.tracks.items.slice(0, 5).map((track) => ({
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
							<GapWrapper gap={8} direction="column">
								<h3>アーティスト</h3>
								<Artist
									href={`artists/${artists[0].id}`}
									src={artists[0].images[0].url}
									artist={{
										name: artists[0].name,
										href: `/artists/${artists[0].id}`,
									}}
									width={200}
									height={200}
									alt="アーティスト画像"
								/>
							</GapWrapper>

							<GapWrapper gap={8} direction="column">
								<h3>アルバム</h3>
								<Jacket
									href={`/albums/${albums[0].id}`}
									src={albums[0].images[0].url}
									album={{
										name: albums[0].name,
										href: `/albums/${albums[0].id}`,
									}}
									width={200}
									height={200}
									alt="アルバム画像"
								/>
							</GapWrapper>

							<GapWrapper gap={8} direction="column">
								<h3>トラック</h3>
								<TrackArea tracks={tracks} />
							</GapWrapper>
						</GapWrapper>
					</Section>
				</>
			)}

			{!query && (
				<Section>
					<h1>お気に入りのアーティスト・曲・アルバムを探しましょう！</h1>
					<Form action="/search">
						<GapWrapper gap={8} direction="row">
							<TextField.Root
								placeholder="何をお探しですか？"
								name="query"
								style={{ width: "500px" }}
							>
								<TextField.Slot>
									<MagnifyingGlassIcon height="16" width="16" />
								</TextField.Slot>
							</TextField.Root>

							<IconButton
								type="submit"
								color="gray"
								variant="solid"
								highContrast
							>
								<PaperPlaneIcon width={16} height={16} />
							</IconButton>
						</GapWrapper>
					</Form>
				</Section>
			)}
		</PageWrapper>
	);
}
