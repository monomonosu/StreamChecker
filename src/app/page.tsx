import { Jacket } from "@/app/_components/client/Jacket/Jacket";
import { Section, SectionWrapper } from "@/app/_components/layouts/Section";
import { JacketSlider } from "@/app/_components/layouts/Slider";

import { getNewReleases } from "@/app/_fetchers/getNewReleases";
import { getPopularityAlbums } from "@/app/_fetchers/getPopularityAlbums";

export default async function Home() {
	// 最新のおすすめ
	const newReleaseData = await getNewReleases();
	// 人気アルバム
	const popularityData = await getPopularityAlbums();
	// TODO：ジャンル（ジャンルはAPIRouteから取得予定）

	return (
		<SectionWrapper>
			<Section>
				<h1>新着</h1>
				<JacketSlider>
					{newReleaseData.albums.items.map((item) => (
						<Jacket
							href="/"
							key={item.id}
							priority
							src={item.images[0].url}
							width={200}
							height={200}
							alt="最新リリースアルバム画像"
						/>
					))}
				</JacketSlider>
			</Section>

			<Section>
				<h1>人気</h1>
				<JacketSlider>
					{popularityData.albums.items.map((item) => (
						<Jacket
							href="/"
							key={item.id}
							priority
							src={item.images[0].url}
							width={200}
							height={200}
							alt="国内人気アルバム画像"
						/>
					))}
				</JacketSlider>
			</Section>
		</SectionWrapper>
	);
}
