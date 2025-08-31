import { Skeleton } from "@radix-ui/themes";
import style from "./loading.module.scss";

export const Loading = () => {
	return (
		<Skeleton
			className={style.skeleton}
			style={{ borderRadius: "var(--radius-4)" }}
		/>
	);
};
