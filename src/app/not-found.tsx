import { Ghost } from "lucide-react";
import { BasicText, LinkText } from "@/app/_styles/components/texts";
import style from "./style.module.scss";

export default function NotFoundPage() {
	return (
		<div className={style.wrapper}>
			<div className={style.inner}>
				<Ghost size={96} />

				<div className={style.content}>
					<h1>404 Not Found</h1>
					<BasicText size={16}>お探しのページは見つかりませんでした</BasicText>
					<LinkText href="/">ホームに戻る</LinkText>
				</div>
			</div>
		</div>
	);
}
