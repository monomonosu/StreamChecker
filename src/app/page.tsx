import { randomUUID } from "node:crypto";

import { Jacket } from "@/app/_components/client/Jacket/Jacket";
import { Section, SectionWrapper } from "@/app/_components/layouts/Section";
import { JacketSlider } from "@/app/_components/layouts/Slider";

export default async function Home() {
	const DUMMY_IMAGE_COUNT = 10;
	return (
		<SectionWrapper>
			<Section>
				<h1>新着</h1>
				<JacketSlider>
					{Array.from({ length: DUMMY_IMAGE_COUNT }).map((_, _index) => (
						<Jacket
							href="/"
							key={randomUUID()}
							priority
							src={"https://placehold.jp/31a07b/ffffff/200x200.png"}
							width={200}
							height={200}
							alt="dummy"
						/>
					))}
				</JacketSlider>
			</Section>

			<Section>
				<h1>人気</h1>
				<JacketSlider>
					{Array.from({ length: DUMMY_IMAGE_COUNT }).map((_, _index) => (
						<Jacket
							href="/"
							key={randomUUID()}
							priority
							src={"https://placehold.jp/31a07b/ffffff/200x200.png"}
							width={200}
							height={200}
							alt="dummy"
						/>
					))}
				</JacketSlider>
			</Section>

			<Section>
				<h1>ジャンル</h1>
				<JacketSlider>
					{Array.from({ length: DUMMY_IMAGE_COUNT }).map((_, _index) => (
						<Jacket
							href="/"
							key={randomUUID()}
							priority
							src={"https://placehold.jp/31a07b/ffffff/200x200.png"}
							width={200}
							height={200}
							alt="dummy"
						/>
					))}
				</JacketSlider>
			</Section>
		</SectionWrapper>
	);
}
