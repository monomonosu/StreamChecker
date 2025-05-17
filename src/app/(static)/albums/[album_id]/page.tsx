import { AlbumHeader } from "@/app/(static)/albums/[album_id]/_components/AlbumHeader";
import { TrackArea } from "@/app/(static)/albums/[album_id]/_components/TrackArea";
import { Section, SectionWrapper } from "@/app/_components/layouts/Section";
import { getAlbum } from "@/app/_fetchers/getAlbum";
import { formatMsToMinSec } from "@/utils/helpers/formatDate";

type Props = {
	params: Promise<{ album_id: string }>;
};

export default async function Album({ params }: Props) {
	const { album_id } = await params;
	const data = await getAlbum(album_id);

	const album: Album = {
		id: data.id,
		name: data.name,
		artists: data.artists,
		image: data.images[1],
		release_date: data.release_date,
	};

	const tracks = data.tracks.items.map((track) => ({
		id: track.id,
		title: track.name,
		artist: track.artists[0].name,
		duration: formatMsToMinSec(track.duration_ms),
	}));

	return (
		<>
			<SectionWrapper>
				<Section>
					<AlbumHeader
						id={album.id}
						name={album.name}
						artists={album.artists}
						release_date={album.release_date}
						image={{
							url: album.image.url,
							width: album.image.width,
							height: album.image.height,
						}}
					/>
				</Section>

				<Section>
					<TrackArea tracks={tracks} />
				</Section>
			</SectionWrapper>
		</>
	);
}
