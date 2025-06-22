"use client";

import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Toast } from "radix-ui";

import { GapWrapper } from "@/app/_styles/components/wrappers";

import { BasicText } from "@/app/_styles/components/texts";
import style from "./snackbar.module.scss";

type Props = {
	snackbar: {
		isOpen: boolean;
		status: number;
		title: string;
	};
	onOpenChange?: (isOpen: boolean) => void;
};

export const Snackbar = ({ snackbar, onOpenChange }: Props) => {
	const { isOpen, status, title } = snackbar;

	return (
		<Toast.Provider swipeDirection="right">
			<Toast.Root
				className={style.Root}
				open={isOpen}
				onOpenChange={onOpenChange}
				duration={3000}
			>
				<Toast.Title>
					<GapWrapper gap={8}>
						{status === 200 ? (
							<CheckCircledIcon height={24} width={24} color="green" />
						) : (
							<CrossCircledIcon height={24} width={24} color="red" />
						)}
						<BasicText size="16px">{title}</BasicText>
					</GapWrapper>
				</Toast.Title>
			</Toast.Root>

			<Toast.Viewport className={style.Viewport} />
		</Toast.Provider>
	);
};
