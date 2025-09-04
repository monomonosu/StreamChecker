"use client";

import React from "react";

import { Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import { Container } from "@/app/(static)/popularity/_components/InfinitePopularityAlbums/Container";

export default function Popularity() {
	return (
		<PageWrapper>
			<Section>
				<h1>人気アルバム・シングル</h1>

				<Container />
			</Section>
		</PageWrapper>
	);
}
