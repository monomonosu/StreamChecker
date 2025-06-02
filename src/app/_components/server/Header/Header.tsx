import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Theme } from "@radix-ui/themes";
import { House } from "lucide-react";
import { Bell } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Search } from "@/app/_components/server/Header/client/SearchButton";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import style from "@/app/_components/server/Header/header.module.scss";

import { PATH } from "@/utils/constants/path";

export const Header = () => {
	return (
		<Theme appearance="dark" className={style.header}>
			<GapWrapper gap={24}>
				<Link
					className={style.link}
					style={{ height: "24px" }}
					href={PATH.HOME}
				>
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
				<Link className={style.link} href={PATH.HOME}>
					<span className={style.label}>ホーム</span>
					<House className={style.icon} size="24px" />
				</Link>
				<Link className={style.link} href={PATH.NEW}>
					<span className={style.label}>新着</span>
					<Bell className={style.icon} size="24px" />
				</Link>
				<Link className={style.link} href={PATH.PICK_UP}>
					<span className={style.label}>人気</span>
					<ChartNoAxesCombined className={style.icon} size="24px" />
				</Link>
			</GapWrapper>

			<GapWrapper gap={24}>
				<Search />
				<HamburgerMenuIcon width={24} height={24} />
			</GapWrapper>
		</Theme>
	);
};
