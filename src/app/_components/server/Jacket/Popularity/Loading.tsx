import { Skeleton } from "@radix-ui/themes";

import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<>
			{[...Array(12).keys()].map((i) => (
				<GapWrapper key={i} direction="column" gap={8}>
					<Skeleton key={i} className={`${style.skeletonImage} radius-1`} />
					<div>
						<Skeleton
							className={`${style.skeletonText} ${style["-small"]} radius-1`}
						/>
						<Skeleton className={`${style.skeletonText} radius-1`} />
					</div>
				</GapWrapper>
			))}
		</>
	);
};
