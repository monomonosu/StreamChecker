import { Rabbit } from "lucide-react";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import style from "./not-found.module.scss";

export default function NotFound() {
	return (
		<div className={style.wrapper}>
			<div className={style.inner}>
				<Rabbit size={96} />

				<div className={style.content}>
					<h1>404 Not Found</h1>
					<BasicText size={16}>お探しのページは見つかりませんでした</BasicText>
					<LinkText href="/">ホームに戻る</LinkText>
				</div>
			</div>
		</div>
	);
}
