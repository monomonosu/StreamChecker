import { Container } from "@/app/_components/client/Track/Container";
import style from "./index.module.scss";

type Props = {
	tracks: Track[];
};

export const Presentational = (props: Props) => {
	const { tracks } = props;

	return (
		<div className={style.column}>
			{tracks.map((track) => (
				<Container key={track.id} tracks={tracks} track={track} />
			))}
		</div>
	);
};
