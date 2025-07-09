"use client";

import Image from "next/image";

import style from "@/app/_components/client/TrackList/track-list.module.scss";
import { BasicText } from "@/app/_styles/components/texts";

import type { PlayingState } from "@/libs/stores/video";
import type { PlaySource } from "@/utils/hooks/usePlayIcon";

type TrackOnList = Track & {
	onClick: () => void;
};

type Props = {
	tracks: TrackOnList[];
	playingState?: PlayingState;
	playSource?: PlaySource;
};

export const TrackList = ({ tracks, playingState, playSource }: Props) => {
	return (
		<div className={style.column}>
			{tracks.map((track) => (
				<button
					type="button"
					className={style.row}
					key={track.id}
					onClick={() => {
						track.onClick();
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							track.onClick();
						}
					}}
				>
					{track.id === playingState?.trackId && playSource && (
						<Image
							width={24}
							height={24}
							src={playSource}
							alt="再生・停止アイコン"
						/>
					)}

					{track.id !== playingState?.trackId && (
						<BasicText style={{ textAlign: "center" }}>{track.index}</BasicText>
					)}

					<BasicText>{track.title}</BasicText>
					<BasicText>{track.duration}</BasicText>
				</button>
			))}
		</div>
	);
};
