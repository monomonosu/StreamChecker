"use client";
import style from "@/app/(static)/artists/[artist_id]/_components/track-area.module.scss";
import { useArtist } from "@/app/(static)/artists/[artist_id]/hook";
import { TrackList } from "@/app/_components/client/TrackTable/TrackList";
import type { SpotifyArtistTopTracksResponse } from "@/app/_fetchers/types";

type Props = {
	topTracks: SpotifyArtistTopTracksResponse;
};

export const TrackArea = ({ topTracks }: Props) => {
	const { handleClickTrack } = useArtist();

	const tracks = topTracks.tracks.map((track, index) => ({
		id: track.id,
		index: index + 1,
		image: track.album.images[0].url,
		title: track.name,
		album: track.album.name,
		artist: track.artists[0].name,
		duration: track.duration_ms,
	}));

	const chunkedTracks = Array.from(
		{ length: Math.ceil(tracks.length / 3) },
		(_, i) => tracks.slice(i * 3, i * 3 + 3),
	);

	return (
		<div className={style.scrollWrapper}>
			<div className={style.gridContainer}>
				{chunkedTracks.map((group, columnIndex) => (
					<TrackList
						key={String(columnIndex)}
						tracks={group.map((track) => ({
							id: track.id,
							index: track.index,
							image: track.image,
							title: track.title,
							album: track.album,
							artist: track.artist,
							duration: track.duration,
							onClick: () =>
								handleClickTrack({
									artistName: track.artist,
									musicName: track.title,
									albumName: track.album,
								}),
						}))}
					/>
				))}
			</div>
		</div>
	);
};
