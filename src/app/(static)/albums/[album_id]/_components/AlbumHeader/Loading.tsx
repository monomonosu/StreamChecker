import { Skeleton } from "@radix-ui/themes";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<GapWrapper gap={16}>
			<Skeleton className={`${style.skeletonImage} radius-1`} />

			<GapWrapper style={{ justifyContent: "end" }} gap={8} direction="column">
				<Skeleton className={`${style.skeletonAlbumName} radius-2`} />

				<GapWrapper gap={8} direction="column">
					<Skeleton className={`${style.skeletonText} radius-1`} />
					<Skeleton className={`${style.skeletonText} radius-1`} />
				</GapWrapper>
			</GapWrapper>
		</GapWrapper>
	);
};
