import style from "@/app/_components/layouts/loading.module.scss";

type LoadingProps = {
	height?: string;
};

export const Loading = ({ height }: LoadingProps) => {
	return (
		<div className={style.loadingWrapper} style={{ height: `${height}` }}>
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
};
