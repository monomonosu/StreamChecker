import { Skeleton } from "@radix-ui/themes";

export const Loading = () => {
	return (
		<>
			{[...Array(24).keys()].map((i) => (
				<Skeleton
					key={i}
					loading
					style={{
						borderRadius: "var(--radius-4)",
						aspectRatio: "1 / 1",
					}}
				>
					<div>
						<br />
					</div>
				</Skeleton>
			))}
		</>
	);
};
