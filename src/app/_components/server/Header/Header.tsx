import Image from "next/image";
import Link from "next/link";

import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Theme } from "@radix-ui/themes";
import { House } from "lucide-react";
import { Bell } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";

import style from "@/app/_components/server/Header/header.module.scss";

export const Header = () => {
	return (
		<Theme appearance="dark" className={style.header}>
			<div className={style.header_inner}>
				<Link className={style.link} style={{ height: "24px" }} href="/">
					<Image
						className={style.logo}
						src="/test-logo.svg"
						height={24}
						alt="logo"
						width={100}
					/>
					<Image
						className={style.logoSmall}
						src="/test-logo.svg"
						height={24}
						alt="logo"
						width={24}
					/>
				</Link>
				<Link className={style.link} href="/">
					<span className={style.label}>ホーム</span>
					<House className={style.icon} size="24px" />
				</Link>
				<Link className={style.link} href="/new">
					<span className={style.label}>新着</span>
					<Bell className={style.icon} size="24px" />
				</Link>
				<Link className={style.link} href="/pick-up">
					<span className={style.label}>人気</span>
					<ChartNoAxesCombined className={style.icon} size="24px" />
				</Link>
			</div>
			<div className={style.header_inner}>
				<MagnifyingGlassIcon width={24} height={24} />
				<HamburgerMenuIcon width={24} height={24} />
			</div>
		</Theme>
	);
};
