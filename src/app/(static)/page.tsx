import { Jacket } from "@/app/_components/client/Jacket/Jacket";
import { Section, SectionWrapper } from "@/app/_components/layouts/Section";
import { Slider } from "@/app/_components/layouts/Slider";

import { getNewReleases } from "@/app/_fetchers/getNewReleases";
import { getPopularityAlbums } from "@/app/_fetchers/getPopularityAlbums";

import { genres } from "@/app/(static)/_utils/_constants";
import { Genre } from "@/app/_components/client/Genre/Genre";

export default async function Home() {
	// 最新のおすすめ
	const newReleaseData = await getNewReleases();
	// 人気アルバム
	const popularityData = await getPopularityAlbums();

	return (
		<SectionWrapper>
			<Section>
				<h1>新着</h1>
				<Slider>
					{newReleaseData.albums.items.map((item) => (
						<Jacket
							href="/"
							key={item.id}
							priority
							src={item.images[0].url}
							music={{ name: item.name, href: item.external_urls.spotify }}
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
							href="/"
							priority
							src={item.images[0].url}
							music={{ name: item.name, href: item.external_urls.spotify }}
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
		</SectionWrapper>
	);
}
