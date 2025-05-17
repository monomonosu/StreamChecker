"use client";

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
					<span>{track.index}</span>
					<span>{track.title}</span>
					<span>{track.duration}</span>
				</div>
			))}
		</div>
	);
};
