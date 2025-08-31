import { Skeleton } from "@radix-ui/themes";
import { Section } from "@/app/_styles/components/blocks";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<Section>
			<Skeleton className={`${style.skeletonHeading} radius-3`} />
			<Skeleton className={`${style.skeletonTrack} radius-1`} />
		</Section>
	);
};
