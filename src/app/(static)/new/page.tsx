"use client";

import { Skeleton } from "@radix-ui/themes";
import React from "react";

import { useNewRelease } from "@/app/(static)/new/hook";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { InfiniteGrid, Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

export default function New() {
	const { data, isValidating, lastElementRef } = useNewRelease();

	return (
		<PageWrapper>
			<Section>
				<h1>新着アルバム・シングル</h1>

				<InfiniteGrid>
					{data?.map((items) => (
						<React.Fragment key={items && `data-${items[0].id}`}>
							{items && (
								<React.Fragment key={`parent-${items[0].id}`}>
									{items?.map((item) => (
										<Jacket
											key={item.id}
											href={`/albums/${item.id}`}
											fill
											priority
											src={item.images[0].url}
											album={{ name: item.name, href: `/albums/${item.id}` }}
											artist={{
												name: item.artists[0].name,
												href: `/artists/${item.artists[0].id}`,
											}}
											alt="最新リリースアルバム画像"
										/>
									))}
								</React.Fragment>
							)}
						</React.Fragment>
					))}
				</InfiniteGrid>

				{isValidating && (
					<InfiniteGrid>
						{[...Array(24).keys()].map((i) => (
							<Skeleton key={i} loading style={{ aspectRatio: "1 / 1" }}>
								<div>
									<br />
								</div>
							</Skeleton>
						))}
					</InfiniteGrid>
				)}

				<div ref={lastElementRef} />
			</Section>
		</PageWrapper>
	);
}
