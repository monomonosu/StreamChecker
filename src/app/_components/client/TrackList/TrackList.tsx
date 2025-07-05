"use client";

import Image from "next/image";

import style from "@/app/_components/client/TrackList/track-list.module.scss";
import { BasicText } from "@/app/_styles/components/texts";

import type { PlayingState } from "@/libs/stores/video";

type TrackOnList = Track & {
	onClick: () => void;
};

type Props = {
	tracks: TrackOnList[];
	playingState: PlayingState;
};

export const TrackList = ({ tracks, playingState }: Props) => {
	return (
		<div className={style.column}>
			{tracks.map((track) => (
				<div
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
					{track.id === playingState.trackId &&
						(playingState.isPlaying ? (
							<Image
								width={24}
								height={24}
								src="/anime/wave_white.gif"
								alt="再生中アニメーション白"
							/>
						) : (
							<Image
								width={24}
								height={24}
								src="/images/wave_white.png"
								alt="停止中画像白"
							/>
						))}

					{track.id !== playingState.trackId && (
						<BasicText style={{ textAlign: "center" }}>{track.index}</BasicText>
					)}

					<BasicText>{track.title}</BasicText>
					<BasicText>{track.duration}</BasicText>
				</div>
			))}
		</div>
	);
};
