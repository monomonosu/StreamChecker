import { Skeleton } from "@radix-ui/themes";
import { Section } from "@/app/_styles/components/blocks";
import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<>
			<Section>
				<Skeleton className={`${style.skeletonHeading} radius-3`} />

				<GapWrapper gap={40} direction="row">
					<GapWrapper gap={8} direction="column">
						<Skeleton className={`${style.skeletonTitle} radius-3`} />
						<Skeleton className={`${style.skeletonJacket} radius-full`} />
						<Skeleton className={`${style.skeletonText} radius-3`} />
					</GapWrapper>

					<GapWrapper gap={8} direction="column">
						<Skeleton className={`${style.skeletonTitle} radius-3`} />
						<Skeleton className={`${style.skeletonJacket} radius-1`} />
						<Skeleton className={`${style.skeletonText} radius-3`} />
					</GapWrapper>

					<GapWrapper gap={8} direction="column">
						<Skeleton className={`${style.skeletonTitle} radius-3`} />
						<Skeleton className={`${style.skeletonTrack} radius-1`} />
					</GapWrapper>
				</GapWrapper>
			</Section>
		</>
	);
};
