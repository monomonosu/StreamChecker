import type { SpotifyArtistResponse } from "@/app/_fetchers/types";

type Props = {
	artistData: SpotifyArtistResponse;
};

export const Presentational = (props: Props) => {
	const { artistData } = props;

	return (
		<div>
			<h2>{artistData.name} の全てのアルバム</h2>
		</div>
	);
};
