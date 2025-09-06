import style from "./loading.module.scss";

export default function Loading() {
	return (
		<div className={style.loadingWrapper}>
			<div className={style.loadingInner}>
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
		</div>
	);
}
