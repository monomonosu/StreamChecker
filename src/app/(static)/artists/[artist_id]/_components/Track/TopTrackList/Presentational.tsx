"use client";

import { BasicText } from "@/app/_styles/components/texts";
import { Container } from "@/app/(static)/artists/[artist_id]/_components/Track/Container";
import style from "./index.module.scss";

type Props = {
	tracks: Track[];
	trackGroups: Track[][];
};

export const Presentational = (props: Props) => {
	const { tracks, trackGroups } = props;

	return (
		<>
			{tracks.length === 0 && (
				<BasicText size={16}>曲が見つかりませんでした。</BasicText>
			)}

			{tracks.length > 0 && (
				<div className={style.scrollWrapper}>
					<div className={style.gridContainer}>
						{trackGroups.map((group) => (
							<div key={group[0].id} className={style.column}>
								{group.map((track) => (
									<Container key={track.id} tracks={tracks} track={track} />
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};
