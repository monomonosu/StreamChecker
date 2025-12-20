"use client";

import { useEffect, useRef } from "react";
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
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		const handleWheel = (e: WheelEvent) => {
			// 縦スクロールの場合、横スクロールに変換
			if (e.deltaY !== 0) {
				e.preventDefault();
				slider.scrollLeft += e.deltaY;
			}
		};

		slider.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			slider.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return (
		<div
			ref={sliderRef}
			className={`${className} ${styled.slider}`}
			style={style}
		>
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
