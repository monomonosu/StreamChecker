import { Skeleton } from "@radix-ui/themes";
import { Section, Slider } from "@/app/_styles/components/blocks";
import { GapWrapper } from "@/app/_styles/components/wrappers";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<Section>
			<Skeleton className={`${style.skeletonHeading} radius-3`} />

			<Slider>
				{[...Array(12).keys()].map((i) => (
					<GapWrapper gap={8} direction="column" key={i}>
						<Skeleton className={`${style.skeletonImage} radius-full`} />
						<Skeleton className={`${style.skeletonText} radius-3`} />
					</GapWrapper>
				))}
			</Slider>
		</Section>
	);
};
