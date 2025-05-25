import { Genre } from "@/app/_components/server/Genre/Genre";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { genres } from "@/app/(static)/_utils/_constants";
import { getNewReleases } from "@/app/_fetchers/getNewReleases";
import { getPopularityAlbums } from "@/app/_fetchers/getPopularityAlbums";

export default async function Home() {
	// 最新のおすすめ
	const newReleaseData = await getNewReleases();
	// 人気アルバム
	const popularityData = await getPopularityAlbums();

	return (
		<PageWrapper>
			<Section>
				<h1>新着</h1>
				<Slider>
					{newReleaseData.albums.items.map((item) => (
						<Jacket
							href={`/albums/${item.id}`}
							key={item.id}
							priority
							src={item.images[0].url}
							album={{ name: item.name, href: `/albums/${item.id}` }}
							artist={{
								name: item.artists[0].name,
								href: `artists/${item.artists[0].id}`,
							}}
							width={200}
							height={200}
							alt="最新リリースアルバム画像"
						/>
					))}
				</Slider>
			</Section>

			<Section>
				<h1>人気</h1>
				<Slider>
					{popularityData.albums.items.map((item) => (
						<Jacket
							key={item.id}
							href={`/albums/${item.id}`}
							priority
							src={item.images[0].url}
							album={{ name: item.name, href: `/albums/${item.id}` }}
							artist={{
								name: item.artists[0].name,
								href: `artists/${item.artists[0].id}`,
							}}
							width={200}
							height={200}
							alt="国内人気アルバム画像"
						/>
					))}
				</Slider>
			</Section>

			<Section>
				<h1>ジャンル</h1>
				<Slider>
					{genres.map((genre) => (
						<Genre
							key={genre.id}
							href="/"
							priority
							src={genre.src}
							genreName={genre.name}
							width={200}
							height={200}
							alt="ジャンル画像"
						/>
					))}
				</Slider>
			</Section>
		</PageWrapper>
	);
}
