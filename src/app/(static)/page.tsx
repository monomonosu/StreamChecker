import { Suspense } from "react";

import { Container as NewReleaseContainer } from "@/app/_components/server/Jacket/NewRelease/Container";
import { Loading as NewReleaseLoading } from "@/app/_components/server/Jacket/NewRelease/Loading";
import { Container as PoPularityContainer } from "@/app/_components/server/Jacket/Popularity/Container";
import { Loading as PopularityLoading } from "@/app/_components/server/Jacket/Popularity/Loading";

import { Section, Slider } from "@/app/_styles/components/blocks";
import { LinkText } from "@/app/_styles/components/texts";
import { BetweenWrapper, PageWrapper } from "@/app/_styles/components/wrappers";

import { PATH } from "@/utils/constants/path";

export default function Home() {
	return (
		<PageWrapper>
			<Section>
				<BetweenWrapper style={{ alignItems: "end" }}>
					<h1>新着</h1>
					<LinkText href={PATH.NEW}>▶︎ ReadMore...</LinkText>
				</BetweenWrapper>

				<Slider>
					<Suspense fallback={<NewReleaseLoading />}>
						<NewReleaseContainer />
					</Suspense>
				</Slider>
			</Section>

			<Section>
				<BetweenWrapper style={{ alignItems: "end" }}>
					<h1>人気</h1>
					<LinkText href={PATH.POPULARITY}>▶︎ ReadMore...</LinkText>
				</BetweenWrapper>

				<Slider>
					<Suspense fallback={<PopularityLoading />}>
						<PoPularityContainer />
					</Suspense>
				</Slider>
			</Section>
		</PageWrapper>
	);
}
