import { Genre } from "@/app/_components/server/Genre/Genre";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";

import { getNewReleases } from "@/app/_fetchers/getNewReleases";
import { getPopularityAlbums } from "@/app/_fetchers/getPopularityAlbums";

import { Section, Slider } from "@/app/_styles/components/blocks";
import { LinkText } from "@/app/_styles/components/texts";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { genres } from "@/app/(static)/_utils/_constants";

import style from "@/app/(static)/index.module.scss";

import { PATH } from "@/utils/constants/path";

export default async function Home() {
	// 最新のおすすめ
	const newReleaseData = await getNewReleases();
	// 人気アルバム
	const popularityData = await getPopularityAlbums();

	return (
		<PageWrapper>
			<div>
				<Section>
					<h1>新着</h1>

					<Slider>
						{newReleaseData.albums.items.map((item) => (
							<div className={style.jacketWrapper} key={item.id}>
								<Jacket
									href={PATH.ALBUMS(item.id)}
									fill
									priority
									src={item.images[0].url}
									album={{ name: item.name, href: PATH.ALBUMS(item.id) }}
									artist={{
										name: item.artists[0].name,
										href: PATH.ARTISTS(item.artists[0].id),
									}}
									alt="最新リリースアルバム画像"
								/>
							</div>
						))}
					</Slider>
				</Section>

				<LinkText href={PATH.NEW}>▶︎ ReadMoreNewAlbums...</LinkText>
			</div>

			<div>
				<Section>
					<h1>人気</h1>

					<Slider>
						{popularityData.albums.items.map((item) => (
							<div className={style.jacketWrapper} key={item.id}>
								<Jacket
									href={PATH.ALBUMS(item.id)}
									fill
									priority
									src={item.images[0].url}
									album={{ name: item.name, href: PATH.ALBUMS(item.id) }}
									artist={{
										name: item.artists[0].name,
										href: PATH.ARTISTS(item.artists[0].id),
									}}
									alt="国内人気アルバム画像"
								/>
							</div>
						))}
					</Slider>
				</Section>

				<LinkText href={PATH.POPULARITY}>▶︎ ReadMorePopularAlbums...</LinkText>
			</div>

			<Section>
				<h1>ジャンル</h1>
				<Slider>
					{genres.map((genre) => (
						<div className={style.jacketWrapper} key={genre.id}>
							<Genre
								href="/"
								fill
								priority
								src={genre.src}
								genreName={genre.name}
								alt="ジャンル画像"
							/>
						</div>
					))}
				</Slider>
			</Section>
		</PageWrapper>
	);
}
