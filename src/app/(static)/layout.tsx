import style from "./layout.module.scss";

export default async function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={style.main}>
			<div className={style["main-inner"]}>{children}</div>
		</div>
	);
}
