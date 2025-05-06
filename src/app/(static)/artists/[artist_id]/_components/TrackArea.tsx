"use client";
import { TopTrackList } from "@/app/(static)/artists/[artist_id]/_components/TrackTable/TopTrackList";
import { useArtist } from "@/app/(static)/artists/[artist_id]/hook";
import type { SpotifyArtistTopTracksResponse } from "@/app/_fetchers/types";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

import style from "@/app/(static)/artists/[artist_id]/_components/track-area.module.scss";

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
				{chunkedTracks.map((group, columnIndex) => (
					<TopTrackList
						key={String(columnIndex)}
						tracks={group.map((track) => ({
							...track,
							onClick: () =>
								handleClickTrack({
									tracks,
									trackId: track.id,
								}),
						}))}
					/>
				))}
			</div>
		</div>
	);
};
