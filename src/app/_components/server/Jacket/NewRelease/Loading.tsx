"use client";

import { Skeleton } from "@radix-ui/themes";

import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "./loading.module.scss";

export default function Loading() {
	return (
		<>
			{[...Array(12).keys()].map((i) => (
				<GapWrapper key={i} direction="column" gap={8}>
					<Skeleton key={i} className={style.skeletonImage} />
					<div>
						<Skeleton className={`${style.skeletonText} ${style["-small"]}`} />
						<Skeleton className={style.skeletonText} />
					</div>
				</GapWrapper>
			))}
		</>
	);
}
