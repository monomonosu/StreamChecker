import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import type { SpotifyAlbumsResponse } from "@/app/_fetchers/types";
import { PATH } from "@/utils/constants/path";
import style from "./index.module.scss";

type Props = {
	newReleaseData: SpotifyAlbumsResponse;
};

export const Presentational = (props: Props) => {
	const { newReleaseData } = props;

	return (
		<>
			{newReleaseData.albums.items.map((item) => (
				<div key={item.id} className={style.jacketWrapper}>
					<Jacket
						href={PATH.ALBUMS(item.id)}
						fill
						priority
						src={item.images[0].url}
						album={{ name: item.name, href: PATH.ALBUMS(item.id) }}
						artist={{
							name: item.artists[0].name,
							href: PATH.ARTISTS(item.artists[0].id),
						}}
						alt="最新リリースアルバム画像"
					/>
				</div>
			))}
		</>
	);
};
