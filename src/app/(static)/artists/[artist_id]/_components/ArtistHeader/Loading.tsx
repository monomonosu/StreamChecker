import { Skeleton } from "@radix-ui/themes";

import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<GapWrapper direction="column" gap={24}>
			<Skeleton className={style.skeletonImage} />
			<Skeleton className={style.skeletonText} />
		</GapWrapper>
	);
};
