"use client";

import Image from "next/image";

import type { SpotifyArtistTopTracksResponse } from "@/app/_fetchers/types";

import { BasicText } from "@/app/_styles/components/texts";

import style from "@/app/(static)/artists/[artist_id]/_components/top-track-list.module.scss";

import { formatMsToMinSec } from "@/utils/helpers/formatDate";
import { usePlayIcon } from "@/utils/hooks/usePlayIcon";
import { usePlayState } from "@/utils/hooks/usePlayState";
import { useTrack } from "@/utils/hooks/useTrack";

type Props = {
	topTracks: SpotifyArtistTopTracksResponse;
};

export const TopTrackList = ({ topTracks }: Props) => {
	const { handleClickTrack } = useTrack();
	const { playingTrackId } = usePlayState();
	const { getPlaySource } = usePlayIcon();

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
									{track.id === playingTrackId && (
										<span>
											<Image
												width={24}
												height={24}
												src={getPlaySource()}
												alt="再生・停止アイコン"
											/>
										</span>
									)}

									{track.id !== playingTrackId && (
										<span style={{ textAlign: "center" }}>{track.index}</span>
									)}

									<span>
										<Image
											className={style.image}
											src={track.image ? track.image : ""}
											alt="トラック画像"
											width={40}
											height={40}
										/>
									</span>
									<span>
										<BasicText className="textEllipsis-1">
											{track.title}
										</BasicText>
										<BasicText
											className="textEllipsis-1"
											style={{ color: "var(--gray-10)" }}
										>
											{track.album}
										</BasicText>
									</span>
									<span className="textEllipsis-1 display-none-sp">
										{track.duration}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
