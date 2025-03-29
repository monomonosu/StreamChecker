"use client";

import Image from "next/image";

import styles from "@/app/_components/client/TrackTable/track-list.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type Track = {
	id: string;
	index: number;
	image: string;
	title: string;
	album: string;
	duration: number;
};

type Props = {
	tracks: Track[];
};

export const TrackList = ({ tracks }: Props) => {
	const chunkedTracks = Array.from(
		{ length: Math.ceil(tracks.length / 3) },
		(_, i) => tracks.slice(i * 3, i * 3 + 3),
	);

	return (
		<div className={styles.scrollWrapper}>
			<div className={styles.gridContainer}>
				{chunkedTracks.map((group, columnIndex) => (
					<div className={styles.column} key={String(columnIndex)}>
						<ul className={styles.list}>
							{group.map((track) => (
								<li key={track.id} className={styles.row}>
									<span className={helper.textEllipsis}>{track.index}</span>
									<span>
										<Image
											className={styles.image}
											src={track.image}
											alt="トラック画像"
											width={40}
											height={40}
										/>
									</span>
									<span className={helper.textEllipsis}>{track.title}</span>
									<span className={helper.textEllipsis}>{track.album}</span>
									<span className={helper.textEllipsis}>{track.duration}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
