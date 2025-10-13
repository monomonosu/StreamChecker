import styled from "@/app/_styles/components/blocks/index.module.scss";

interface SectionProps {
	children: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => {
	return <section className={styled.section}>{children}</section>;
};

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const Slider = ({ children, className, style }: SliderProps) => {
	return (
		<div className={`${className} ${styled.slider}`} style={style}>
			{children}
		</div>
	);
};

interface InfiniteGridProps {
	children: React.ReactNode;
}

export const InfiniteGrid = ({ children }: InfiniteGridProps) => {
	return <div className={styled.infiniteGrid}>{children}</div>;
};
