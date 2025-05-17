"use client";

import { useAlbum } from "@/app/(static)/albums/[album_id]/hook";
import { TrackList } from "@/app/_components/client/TrackList/TrackList";

type Props = {
	tracks: Track[];
};

export const TrackArea = ({ tracks }: Props) => {
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

	return <TrackList tracks={trackList} />;
};
