"use client";
import Image from "next/image";

import { useArtist } from "@/app/(static)/artists/[artist_id]/hook";
import type { SpotifyArtistTopTracksResponse } from "@/app/_fetchers/types";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

import style from "@/app/(static)/artists/[artist_id]/_components/track-area.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type Props = {
	topTracks: SpotifyArtistTopTracksResponse;
};

export const TrackArea = ({ topTracks }: Props) => {
	const { handleClickTrack } = useArtist();

	const tracks: Track[] = topTracks.tracks.map((track, index) => ({
		id: track.id,
		index: index + 1,
		image: track.album.images[0].url,
		title: track.name,
		album: track.album.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	const chunkedTracks = Array.from(
		{ length: Math.ceil(tracks.length / 3) },
		(_, i) => tracks.slice(i * 3, i * 3 + 3),
	);

	return (
		<div className={style.scrollWrapper}>
			<div className={style.gridContainer}>
				{chunkedTracks.map((group) => (
					<div key={group[0].id} className={style.column}>
						<ul className={style.list}>
							{group.map((track) => (
								<li
									key={track.id}
									className={style.row}
									onClick={() =>
										handleClickTrack({
											trackQueue: tracks,
											trackId: track.id,
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleClickTrack({
												trackQueue: tracks,
												trackId: track.id,
											});
										}
									}}
								>
									<span className={helper.textEllipsis}>{track.index}</span>
									<span>
										<Image
											className={style.image}
											src={track.image ? track.image : ""}
											alt="トラック画像"
											width={40}
											height={40}
										/>
									</span>
									<span className={helper.textEllipsis}>{track.title}</span>
									<span className={helper.textEllipsis}>{track.album}</span>
									<span className={helper.textEllipsis}>{track.duration}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
