import Link, { type LinkProps } from "next/link";
import React from "react";

interface BasicTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	size?: string | number;
	color?: string;
	isBold?: boolean;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

export const BasicText = ({
	size = "var(--font-size-2)",
	color,
	isBold,
	children,
	style,
	...props
}: BasicTextProps) => {
	return (
		<p
			{...props}
			style={{
				color: color,
				fontSize: size,
				fontWeight: isBold ? 600 : 400,
				...style,
			}}
		>
			{children}
		</p>
	);
};

interface LinkTextProps
	extends LinkProps,
		React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	size?: string | number;
	color?: string;
	isBold?: boolean;
}

export const LinkText = React.forwardRef<HTMLAnchorElement, LinkTextProps>(
	(
		{
			href,
			size = "var(--font-size-2)",
			color = "var(--gray-10)",
			isBold,
			children,
			...props
		},
		ref,
	) => {
		return (
			<Link
				href={href}
				ref={ref}
				style={{ color, fontSize: size, fontWeight: isBold ? 600 : 400 }}
				{...props}
			>
				{children}
			</Link>
		);
	},
);
