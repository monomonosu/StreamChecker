import { Skeleton } from "@radix-ui/themes";

import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<div className={style.skeletonWrapper}>
			<div className={style.skeletonContainer}>
				{[...Array(3).keys()].map((i) => (
					<Skeleton key={i} className={`${style.skeletonColumn} radius-1`} />
				))}
			</div>
		</div>
	);
};
