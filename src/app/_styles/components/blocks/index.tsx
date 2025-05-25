import style from "@/app/_styles/components/blocks/index.module.scss";

interface SectionProps {
	children: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => {
	return <section className={style.section}>{children}</section>;
};

interface SliderProps {
	children: React.ReactNode;
}

export const Slider = ({ children }: SliderProps) => {
	return <div className={style.slider}>{children}</div>;
};
