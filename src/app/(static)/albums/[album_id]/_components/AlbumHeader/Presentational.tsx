import Image from "next/image";
import { Fragment } from "react";
import type { SpotifyAlbumResponse } from "@/app/_fetchers/types";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";
import { PATH } from "@/utils/constants/path";

type Props = {
	albumData: SpotifyAlbumResponse;
};

export const Presentational = (props: Props) => {
	const { albumData } = props;

	return (
		<GapWrapper gap={16}>
			<Image
				unoptimized
				style={{ borderRadius: "var(--radius-4)" }}
				src={
					albumData.images[1].url
						? albumData.images[1].url
						: "/images/no-image.png"
				}
				alt={albumData.name}
				width={albumData.images[1].width ? albumData.images[1].width : 0}
				height={albumData.images[1].height ? albumData.images[1].height : 0}
			/>

			<GapWrapper style={{ justifyContent: "end" }} gap={8} direction="column">
				<h1>{albumData.name}</h1>

				<GapWrapper direction="column">
					<GapWrapper direction="row">
						{albumData.artists.map((artist, index) => (
							<Fragment key={artist.id}>
								<LinkText href={PATH.ARTISTS(artist.id)} prefetch={false}>
									{artist.name}
								</LinkText>
								{index < albumData.artists.length - 1 && (
									<BasicText>,</BasicText>
								)}
							</Fragment>
						))}
					</GapWrapper>

					<BasicText>{albumData.release_date}</BasicText>
				</GapWrapper>
			</GapWrapper>
		</GapWrapper>
	);
};
