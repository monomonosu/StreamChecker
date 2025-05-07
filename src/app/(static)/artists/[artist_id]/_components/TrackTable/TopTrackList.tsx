"use client";

import Image from "next/image";

import styles from "@/app/(static)/artists/[artist_id]/_components/TrackTable/top-track-list.module.scss";
import helper from "@/app/_styles/helper.module.scss";

type TopTrack = Track & {
	onClick: () => void;
};

type Props = {
	topTracks: TopTrack[];
};

export const TopTrackList = ({ topTracks }: Props) => {
	return (
		<>
			<div className={styles.column}>
				<ul className={styles.list}>
					{topTracks.map((track) => (
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
									src={track.image ? track.image : ""}
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
