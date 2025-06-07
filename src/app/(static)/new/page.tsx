"use client";

import React from "react";

import { useNewRelease } from "@/app/(static)/new/hook";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section } from "@/app/_styles/components/blocks";
import { GapWrapper, PageWrapper } from "@/app/_styles/components/wrappers";

export default function New() {
	const { data, lastElementRef } = useNewRelease();

	return (
		<PageWrapper>
			<Section>
				<h1>新着アルバム・シングル</h1>

				<GapWrapper gap={24}>
					{data?.map((items) => (
						<React.Fragment key={`parent-${items[0].id}`}>
							{items.map((item) => (
								<Jacket
									key={item.id}
									href={`/albums/${item.id}`}
									priority
									src={item.images[0].url}
									album={{ name: item.name, href: `/albums/${item.id}` }}
									artist={{
										name: item.artists[0].name,
										href: `/artists/${item.artists[0].id}`,
									}}
									width={200}
									height={200}
									alt="最新リリースアルバム画像"
								/>
							))}
						</React.Fragment>
					))}
				</GapWrapper>

				<div ref={lastElementRef}>最後の要素</div>
			</Section>
		</PageWrapper>
	);
}
