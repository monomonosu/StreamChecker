"use client";

import { TrackList } from "@/app/_components/client/TrackList/TrackList";

import { useAlbum } from "@/app/(static)/albums/[album_id]/hook";
import { usePlayState } from "@/utils/hooks/usePlayState";

type Props = {
	tracks: Track[];
};

export const TrackArea = ({ tracks }: Props) => {
	const { isPlaying, playingTrackId } = usePlayState();
	const { handleClickTrack } = useAlbum();

	const trackList = tracks.map((track, index) => ({
		id: track.id,
		index: index + 1,
		title: track.title,
		duration: track.duration,
		onClick: () => {
			handleClickTrack({ trackQueue: tracks, trackId: track.id });
		},
	}));

	return (
		<TrackList
			tracks={trackList}
			playingState={{ isPlaying, trackId: playingTrackId }}
		/>
	);
};
