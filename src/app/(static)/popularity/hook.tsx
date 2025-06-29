"use client";

import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import type { CustomResponse } from "@/app/api/type";

export default function usePopularity() {
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
		return `/api/spotify/albums-popularity?offset=${page * 24}&limit=24`;
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
}
