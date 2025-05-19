import style from "@/app/_styles/components/wrappers/index.module.scss";

type DirectionType = "row" | "column" | "column-reverse";
type GapValue = 0 | 8 | 16 | 24 | 32 | 40 | 48;

interface PageWrapperProps {
	children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
	return <div className={style.pageWrapper}>{children}</div>;
};

interface GapWrapperProps {
	children: React.ReactNode;
	direction?: DirectionType;
	gap?: GapValue;
}

export const GapWrapper = ({
	children,
	direction = "row",
	gap = 0,
}: GapWrapperProps) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: direction,
				gap: `${gap}px`,
				flexWrap: "wrap",
			}}
		>
			{children}
		</div>
	);
};
