import Image from "next/image";

import type { ComponentProps } from "react";
import { BasicText } from "@/app/_styles/components/texts";
import type { PlaySource } from "@/utils/hooks/usePlayIcon";

import style from "./index.module.scss";

type CustomProps = {
	track: Track;
	playingTrackId: string | null;
	playSource: PlaySource;
};

type Props = CustomProps & ComponentProps<"button">;

export const Presentational = (props: Props) => {
	const { track, playingTrackId, playSource, onClick, onKeyDown } = props;

	return (
		<button
			type="button"
			className={style.row}
			onClick={onClick}
			onKeyDown={onKeyDown}
		>
			{track.id === props.playingTrackId && (
				<span>
					<Image
						width={24}
						height={24}
						src={playSource}
						alt="再生・停止アイコン"
					/>
				</span>
			)}

			{track.id !== playingTrackId && (
				<span style={{ textAlign: "center" }}>{track.index}</span>
			)}

			<span>
				<Image
					className={style.image}
					src={track.image || ""}
					alt="トラック画像"
					width={40}
					height={40}
				/>
			</span>

			<span>
				<BasicText className="textEllipsis-1">{track.title}</BasicText>
				<BasicText
					className="textEllipsis-1"
					style={{ color: "var(--gray-10)" }}
				>
					{track.album}
				</BasicText>
			</span>
			<span className="textEllipsis-1 display-none-sp">{track.duration}</span>
		</button>
	);
};
