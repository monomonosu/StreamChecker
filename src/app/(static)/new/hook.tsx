"use client";

import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";

export const useNewRelease = () => {
	const [hasMore, setHasMore] = useState(true);
	const lastElementRef = useRef<HTMLDivElement>(null);

	const fetcher = async (url: string) => {
		const res = await fetch(url);

		const data = (await res.json()) as SpotifyAlbumsResponse;
		if (!data || !data.albums || data.albums.items.length === 0) {
			setHasMore(false);
			return [];
		}
		return data.albums.items;
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

	return {
		data,
		isValidating,
		lastElementRef,
	};
};
