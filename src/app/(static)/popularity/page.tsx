"use client";

import { Skeleton } from "@radix-ui/themes";
import React from "react";

import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { InfiniteGrid, Section } from "@/app/_styles/components/blocks";
import { PageWrapper } from "@/app/_styles/components/wrappers";

import usePopularity from "@/app/(static)/popularity/hook";
import { PATH } from "@/utils/constants/path";

export default function Popularity() {
	const { data, isValidating, lastElementRef } = usePopularity();

	return (
		<PageWrapper>
			<Section>
				<h1>人気アルバム</h1>

				<InfiniteGrid>
					{data?.map((items, index) => (
						<React.Fragment
							key={items ? `parent-${items[0].id + index}` : "no-items"}
						>
							{items.map((item) => (
								<Jacket
									key={item.id}
									href={PATH.ALBUMS(item.id)}
									fill
									priority
									src={item.images[0].url}
									album={{ name: item.name, href: PATH.ALBUMS(item.id) }}
									artist={{
										name: item.artists[0].name,
										href: PATH.ARTISTS(item.artists[0].id),
									}}
									alt="人気アルバム画像"
								/>
							))}
						</React.Fragment>
					))}
				</InfiniteGrid>

				{isValidating && (
					<InfiniteGrid>
						{[...Array(24).keys()].map((i) => (
							<Skeleton
								key={i}
								loading
								style={{
									borderRadius: "var(--radius-4)",
									aspectRatio: "1 / 1",
								}}
							>
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
