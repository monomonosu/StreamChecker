"use client";

import { useEffect, useRef, useState } from "react";
import style from "@/app/_components/client/Marquee/marquee.module.scss";

type Props = {
	children: React.ReactNode;
};

export const Marquee = ({ children }: Props) => {
	const outerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const [shouldScroll, setShouldScroll] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: マーキーが動作しなくなるのでchildrenの変更時に再評価
	useEffect(() => {
		const outerWidth = outerRef.current?.offsetWidth ?? 0;
		const innerWidth = innerRef.current?.scrollWidth ?? 0;
		setShouldScroll(innerWidth > outerWidth);
	}, [children]);

	return (
		<div ref={outerRef} className={style.marquee}>
			<div
				ref={innerRef}
				className={`${style.marqueeInner} ${shouldScroll && style.scrolling}`}
			>
				{children}
			</div>
		</div>
	);
};
