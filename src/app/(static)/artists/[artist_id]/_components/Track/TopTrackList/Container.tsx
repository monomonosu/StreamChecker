import { getTopTracksByArtist } from "@/app/_fetchers/getTopTracksByArtist";
import { Presentational } from "@/app/(static)/artists/[artist_id]/_components/Track/TopTrackList/Presentational";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	artist_id: string;
};

export const Container = async (props: Props) => {
	const { artist_id } = props;
	const topTracksData = await getTopTracksByArtist(artist_id);

	const topTracks: Track[] = await topTracksData.tracks.map((track, index) => ({
		id: track.id,
		index: index + 1,
		image: track.album.images[0].url,
		title: track.name,
		album: track.album.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	const chunkedTracks = await Array.from(
		{ length: Math.ceil(topTracks.length / 3) },
		(_, i) => topTracks.slice(i * 3, i * 3 + 3),
	);

	return <Presentational tracks={topTracks} trackGroups={chunkedTracks} />;
};
