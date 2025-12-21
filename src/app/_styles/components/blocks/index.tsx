"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);

	// スクロール位置に応じてボタンの表示/非表示を制御
	const updateButtonVisibility = useCallback(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		const { scrollLeft, scrollWidth, clientWidth } = slider;
		setShowLeftButton(scrollLeft > 0);
		setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
	}, []);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		// 初期状態のボタン表示を更新
		updateButtonVisibility();

		const handleWheel = (e: WheelEvent) => {
			// 縦スクロールの場合、横スクロールに変換
			if (e.deltaY !== 0) {
				e.preventDefault();
				slider.scrollLeft += e.deltaY;
			}
		};

		const handleScroll = () => {
			updateButtonVisibility();
		};

		slider.addEventListener("wheel", handleWheel, { passive: false });
		slider.addEventListener("scroll", handleScroll);

		// リサイズ時もボタンの表示を更新
		const resizeObserver = new ResizeObserver(() => {
			updateButtonVisibility();
		});
		resizeObserver.observe(slider);

		return () => {
			slider.removeEventListener("wheel", handleWheel);
			slider.removeEventListener("scroll", handleScroll);
			resizeObserver.disconnect();
		};
	}, [updateButtonVisibility]);

	// 左へスクロール
	const scrollLeft = () => {
		const slider = sliderRef.current;
		if (!slider) return;

		const scrollAmount = slider.clientWidth * 0.8;
		slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
	};

	// 右へスクロール
	const scrollRight = () => {
		const slider = sliderRef.current;
		if (!slider) return;

		const scrollAmount = slider.clientWidth * 0.8;
		slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
	};

	return (
		<div className={styled.sliderContainer}>
			{showLeftButton && (
				<button
					type="button"
					className={`${styled.navButton} ${styled.navButtonLeft}`}
					onClick={scrollLeft}
					aria-label="前へ"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>prev-button</title>
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>
			)}

			<div
				ref={sliderRef}
				className={`${className} ${styled.slider}`}
				style={style}
			>
				{children}
			</div>

			{showRightButton && (
				<button
					type="button"
					className={`${styled.navButton} ${styled.navButtonRight}`}
					onClick={scrollRight}
					aria-label="次へ"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>next-button</title>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			)}
		</div>
	);
};

interface InfiniteGridProps {
	children: React.ReactNode;
}

export const InfiniteGrid = ({ children }: InfiniteGridProps) => {
	return <div className={styled.infiniteGrid}>{children}</div>;
};
