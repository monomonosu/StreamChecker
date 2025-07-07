"use client";

import { TrackList } from "@/app/_components/client/TrackList/TrackList";

import { usePlayIcon } from "@/utils/hooks/usePlayIcon";
import { usePlayState } from "@/utils/hooks/usePlayState";
import { useTrack } from "@/utils/hooks/useTrack";

type Props = {
	tracks: Track[];
};

export const TrackArea = ({ tracks }: Props) => {
	const { handleClickTrack } = useTrack();
	const { playingTrackId } = usePlayState();
	const { getPlaySource } = usePlayIcon();

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
			playingState={{ trackId: playingTrackId }}
			playSource={getPlaySource()}
		/>
	);
};
