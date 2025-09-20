"use client";

import { Ghost } from "lucide-react";
import { BasicText } from "@/app/_styles/components/texts";
import style from "./style.module.scss";

export default function ErrorPage() {
	return (
		<div className={style.wrapper}>
			<div className={style.inner}>
				<Ghost size={96} />

				<div className={style.content}>
					<h1>500 Internal Server Error</h1>
					<BasicText size={16}>サーバー内部でエラーが発生しました</BasicText>
					<BasicText size={12}>
						時間をおいて再度アクセスしてみてください
					</BasicText>
				</div>
			</div>
		</div>
	);
}
