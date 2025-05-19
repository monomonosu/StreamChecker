import Link from "next/link";

interface BasicTextProps {
	size?: string | number;
	color?: string;
	isBold?: boolean;
	children: React.ReactNode;
}

export const BasicText = ({
	size = "var(--font-size-2)",
	color,
	isBold,
	children,
}: BasicTextProps) => {
	return (
		<p
			style={{
				color: color,
				fontSize: size,
				fontWeight: isBold ? 600 : 400,
			}}
		>
			{children}
		</p>
	);
};

interface LinkTextProps {
	href: string;
	size?: string | number;
	color?: string;
	isBold?: boolean;
	children: React.ReactNode;
}

export const LinkText = ({
	href,
	size = "var(--font-size-2)",
	color = "var(--gray-10)",
	isBold,
	children,
}: LinkTextProps) => {
	return (
		<Link
			href={href}
			style={{
				color: color,
				fontSize: size,
				fontWeight: isBold ? 600 : 400,
			}}
		>
			{children}
		</Link>
	);
};
