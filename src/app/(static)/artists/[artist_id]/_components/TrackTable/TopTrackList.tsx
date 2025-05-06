"use client";

import Image from "next/image";

import styles from "@/app/(static)/artists/[artist_id]/_components/TrackTable/top-track-list.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type Track = {
	id: string;
	index: number;
	image: string;
	title: string;
	album: string;
	duration: string;
	onClick: () => void;
};

type Props = {
	tracks: Track[];
};

export const TopTrackList = ({ tracks }: Props) => {
	return (
		<>
			<div className={styles.column}>
				<ul className={styles.list}>
					{tracks.map((track) => (
						<li
							key={track.id}
							className={styles.row}
							onClick={() => track.onClick()}
							onKeyDown={() => track.onClick()}
						>
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
		</>
	);
};
