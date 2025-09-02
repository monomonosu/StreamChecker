import { Container } from "@/app/_components/client/Track/Container";
import { Section } from "@/app/_styles/components/blocks";
import style from "./index.module.scss";

type Props = {
	tracks: {
		id: string;
		index: number;
		title: string;
		artist: string;
		duration: string;
	}[];
};

export const Presentational = (props: Props) => {
	const { tracks } = props;

	return (
		<>
			{tracks && tracks.length > 0 && (
				<Section>
					<h2>トラック</h2>

					<div className={style.column}>
						{tracks.map((track) => (
							<Container key={track.id} tracks={tracks} track={track} />
						))}
					</div>
				</Section>
			)}

			{!tracks && null}
		</>
	);
};
