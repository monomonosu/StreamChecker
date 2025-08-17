import Image from "next/image";
import { Fragment } from "react";

import { BasicText, LinkText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import { PATH } from "@/utils/constants/path";

type Props = Album;

export const AlbumHeader = ({ name, artists, release_date, image }: Props) => {
	return (
		<GapWrapper gap={16}>
			<Image
				unoptimized
				style={{ borderRadius: "var(--radius-4)" }}
				src={image.url}
				alt={name}
				width={image.width ? image.width : 0}
				height={image.height ? image.height : 0}
			/>

			<GapWrapper style={{ justifyContent: "end" }} gap={8} direction="column">
				<h1>{name}</h1>
				<GapWrapper direction="column">
					<GapWrapper direction="row">
						{artists.map((artist, index) => (
							<Fragment key={artist.id}>
								<LinkText href={PATH.ARTISTS(artist.id)}>
									{artist.name}
								</LinkText>
								{index < artists.length - 1 && <BasicText>,</BasicText>}
							</Fragment>
						))}
					</GapWrapper>
					<BasicText>{release_date}</BasicText>
				</GapWrapper>
			</GapWrapper>
		</GapWrapper>
	);
};
