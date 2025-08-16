import { Skeleton } from "@radix-ui/themes";

import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<GapWrapper direction="column" gap={24}>
			<Skeleton className={`${style.skeletonImage} radius-full`} />
			<Skeleton className={`${style.skeletonText} radius-3`} />
		</GapWrapper>
	);
};
