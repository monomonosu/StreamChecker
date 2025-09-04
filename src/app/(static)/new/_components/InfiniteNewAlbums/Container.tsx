"use client";

import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { Presentational } from "@/app/(static)/new/_components/InfiniteNewAlbums/Presentational";
import type { CustomResponse } from "@/app/api/type";

export const Container = () => {
	const [hasMore, setHasMore] = useState(true);
	const lastElementRef = useRef<HTMLDivElement>(null);

	const fetcher = async (url: string) => {
		const fetcher = await fetch(url);
		const res: CustomResponse<SpotifyAlbumsResponse> = await fetcher.json();

		if (res.status.code !== 200) {
			setHasMore(false);
			return;
		}

		return res.data?.albums.items;
	};

	const getKey = (page: number) => {
		return `/api/spotify/new-release?offset=${page * 24}&limit=24`;
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
		<Presentational
			albums={data}
			isValidation={isValidating}
			lastElementRef={lastElementRef}
		/>
	);
};
