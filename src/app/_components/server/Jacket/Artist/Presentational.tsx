import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import type { SpotifyArtistAlbumsResponse } from "@/app/_fetchers/types";
import { PATH } from "@/utils/constants/path";
import style from "./index.module.scss";

type Props = {
	artistAlbums: SpotifyArtistAlbumsResponse;
};

export const Presentational = (props: Props) => {
	const { artistAlbums } = props;

	return (
		<>
			{artistAlbums.items.map((item) => (
				<div key={item.id} className={style.jacketWrapper}>
					<Jacket
						href={PATH.ALBUMS(item.id)}
						fill
						priority
						src={
							item.images.length ? item.images[0].url : "/images/no-image.png"
						}
						album={{ name: item.name, href: PATH.ALBUMS(item.id) }}
						artist={{
							name: item.artists[0].name,
							href: PATH.ARTISTS(item.artists[0].id),
						}}
						alt="アルバム画像"
					/>
				</div>
			))}
		</>
	);
};
