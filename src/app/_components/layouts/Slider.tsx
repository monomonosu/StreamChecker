import style from "@/app/_components/layouts/slider.module.scss";

interface SliderProps {
	children: React.ReactNode;
}

export const JacketSlider = ({ children }: SliderProps) => {
	return <div className={style.jacketSlider}>{children}</div>;
};
