import style from "./loading.module.scss";

export default function Loading() {
	return (
		<div
			className={style.loadingWrapper}
			style={{ height: "calc(100vh - 56px - 48px * 2)" }}
		>
			<div>
				<div className={style.loading}>
					<div className={style.bar} />
					<div className={style.bar} />
					<div className={style.bar} />
					<div className={style.bar} />
					<div className={style.bar} />
				</div>
				<p className={style.loadingText}>Loading...</p>
			</div>
		</div>
	);
}
