import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Theme } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

import style from "@/app/_components/server/Header/header.module.scss";

export const Header = () => {
	return (
		<Theme appearance="dark" className={style.header}>
			<div className={style.header_inner}>
				<Link className={style.link} href="/">
					<Image src="/test-logo.svg" height={24} alt="" width={100} />
				</Link>
				<Link className={style.link} href="/">
					ホーム
				</Link>
				<Link className={style.link} href="/new">
					新着
				</Link>
				<Link className={style.link} href="/pick-up">
					人気
				</Link>
			</div>
			<div className={style.header_inner}>
				<MagnifyingGlassIcon width={24} height={24} />
				<HamburgerMenuIcon width={24} height={24} />
			</div>
		</Theme>
	);
};
