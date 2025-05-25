"use client";

import { BasicText } from "@/app/_styles/components/texts";

import style from "@/app/_components/client/TrackList/track-list.module.scss";

type TrackOnList = Track & {
	onClick: () => void;
};

type Props = {
	tracks: TrackOnList[];
};

export const TrackList = ({ tracks }: Props) => {
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
					<BasicText>{track.index}</BasicText>
					<BasicText>{track.title}</BasicText>
					<BasicText>{track.duration}</BasicText>
				</div>
			))}
		</div>
	);
};
