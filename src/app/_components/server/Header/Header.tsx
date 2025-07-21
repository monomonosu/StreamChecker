import {
	HamburgerMenuIcon,
	MagnifyingGlassIcon,
	PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import { Bell, ChartNoAxesCombined, House } from "lucide-react";

import Form from "next/form";
import Link from "next/link";

import { Logo } from "@/app/_components/server/Header/client/Logo";
import { ThemeToggle } from "@/app/_components/server/Header/client/ThemeToggle";

import style from "@/app/_components/server/Header/header.module.scss";

import { Popup } from "@/app/_components/server/Popup/Popup";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import { PATH } from "@/utils/constants/path";

export const Header = () => {
	return (
		<div className={style.header}>
			<GapWrapper gap={24}>
				<Link
					className={style.link}
					style={{ height: "24px" }}
					href={PATH.HOME}
				>
					<Logo />
				</Link>
				<Link className={style.link} href={PATH.HOME}>
					<span className="display-none-sp">ホーム</span>
					<House className="display-only-sp" size="24px" />
				</Link>
				<Link className={style.link} href={PATH.NEW}>
					<span className="display-none-sp">新着</span>
					<Bell className="display-only-sp" size="24px" />
				</Link>
				<Link className={style.link} href={PATH.POPULARITY}>
					<span className="display-none-sp">人気</span>
					<ChartNoAxesCombined className="display-only-sp" size="24px" />
				</Link>
			</GapWrapper>

			<GapWrapper gap={24}>
				<Popup
					align="end"
					side="bottom"
					triggerContent={
						<IconButton color="gray" variant="ghost">
							<MagnifyingGlassIcon
								color="var(--slate-12)"
								width={24}
								height={24}
							/>
						</IconButton>
					}
				>
					<Form action="/search">
						<GapWrapper gap={8} direction="row">
							<TextField.Root
								placeholder="何をお探しですか？"
								name="query"
								className={style.textField}
							>
								<TextField.Slot>
									<MagnifyingGlassIcon height="16" width="16" />
								</TextField.Slot>
							</TextField.Root>

							<IconButton
								type="submit"
								color="gray"
								variant="solid"
								highContrast
							>
								<PaperPlaneIcon width={16} height={16} />
							</IconButton>
						</GapWrapper>
					</Form>
				</Popup>

				<Popup
					align="end"
					side="bottom"
					triggerContent={
						<IconButton color="gray" variant="ghost">
							<HamburgerMenuIcon
								color="var(--slate-12)"
								width={24}
								height={24}
							/>
						</IconButton>
					}
				>
					<ThemeToggle />
				</Popup>
			</GapWrapper>
		</div>
	);
};
