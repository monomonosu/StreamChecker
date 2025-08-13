"use client";

import { Presentational } from "@/app/(static)/artists/[artist_id]/_components/Track/Presentational";

import { usePlayIcon } from "@/utils/hooks/usePlayIcon";
import { usePlayState } from "@/utils/hooks/usePlayState";
import { useTrack } from "@/utils/hooks/useTrack";

type Props = {
	tracks: Track[];
	track: Track;
};

export const Container = (props: Props) => {
	const { handleClickTrack } = useTrack();
	const { playingTrackId } = usePlayState();
	const { getPlaySource } = usePlayIcon();

	const { tracks, track } = props;

	return (
		<Presentational
			track={track}
			playingTrackId={playingTrackId}
			playSource={getPlaySource()}
			onClick={() =>
				handleClickTrack({ trackQueue: tracks, trackId: track.id })
			}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					handleClickTrack;
				}
			}}
		/>
	);
};
