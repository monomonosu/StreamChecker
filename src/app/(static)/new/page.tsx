"use client";

import { Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";
import { Container } from "@/app/(static)/new/_components/Container";

export default function New() {
	return (
		<PageWrapper>
			<Section>
				<h1>新着アルバム・シングル</h1>

				<Container />
			</Section>
		</PageWrapper>
	);
}
