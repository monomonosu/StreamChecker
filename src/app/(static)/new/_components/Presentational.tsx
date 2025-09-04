"use client";

import React from "react";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import type { SpotifyAlbumItem } from "@/app/_fetchers/types";
import { InfiniteGrid } from "@/app/_styles/components/blocks";
import { PATH } from "@/utils/constants/path";

type Props = {
	albums: (SpotifyAlbumItem[] | undefined)[] | undefined;
	isValidation: boolean;
	lastElementRef: React.RefObject<HTMLDivElement | null>;
};

export const Presentational = (props: Props) => {
	const { albums, isValidation, lastElementRef } = props;

	return (
		<>
			<InfiniteGrid>
				{albums?.map((items) => (
					<React.Fragment key={items ? `parent-${items[0].id}` : "no-items"}>
						{items?.map((item) => (
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
								alt="最新リリースアルバム画像"
							/>
						))}
					</React.Fragment>
				))}

				{isValidation && <div>TODO：ここにLoading</div>}
			</InfiniteGrid>

			<div ref={lastElementRef} />
		</>
	);
};
