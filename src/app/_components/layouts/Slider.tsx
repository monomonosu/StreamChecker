import style from "@/app/_components/layouts/slider.module.scss";

interface SliderProps {
	children: React.ReactNode;
}

export const Slider = ({ children }: SliderProps) => {
	return <div className={style.slider}>{children}</div>;
};
