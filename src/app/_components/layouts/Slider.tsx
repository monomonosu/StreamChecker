import style from "@/app/_components/layouts/slider.module.scss";

interface SectionProps {
	children: React.ReactNode;
}

export const JacketSlider = ({ children }: SectionProps) => {
	return <div className={style.jacketSlider}>{children}</div>;
};
