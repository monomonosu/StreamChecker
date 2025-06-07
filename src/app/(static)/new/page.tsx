"use client";

import React, { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Section } from "@/app/_styles/components/blocks";
import { GapWrapper, PageWrapper } from "@/app/_styles/components/wrappers";

import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";

export default function New() {
	const [hasMore, setHasMore] = useState(true);
	const lastElementRef = useRef<HTMLDivElement>(null);

	const fetcher = async (url: string) => {
		const res = await fetch(url);

		const data = (await res.json()) as SpotifyAlbumsResponse;
		console.log("data:", data);
		if (!data || !data.albums || data.albums.items.length === 0) {
			setHasMore(false);
			return [];
		}
		return data.albums.items;
	};

	const getKey = (page: number) => {
		return `/api/spotify/new-release?offset=${page * 10}&limit=20`;
	};

	const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

	useEffect(() => {
		const observer = new IntersectionObserver(([entries]) => {
			if (entries.isIntersecting && !isValidating && hasMore) {
				setSize(size + 1);
			}
		});

		if (lastElementRef.current) {
			observer.observe(lastElementRef.current);
		}
		return () => {
			if (lastElementRef.current) {
				observer.unobserve(lastElementRef.current);
			}
		};
	}, [isValidating, setSize, hasMore, size]);

	return (
		<PageWrapper>
			<Section>
				<h1>新着アルバム・シングル</h1>

				<GapWrapper gap={24}>
					{data?.map((items, index) => (
						<React.Fragment key={`parent-${items[0].id + index}`}>
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
