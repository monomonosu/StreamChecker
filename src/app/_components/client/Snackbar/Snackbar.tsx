"use client";

import {
	CheckCircledIcon,
	CrossCircledIcon,
	ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Toast } from "radix-ui";

import { GapWrapper } from "@/app/_styles/components/wrappers";

import { formatStatusCategory } from "@/utils/helpers/formatStatus";

import style from "./snackbar.module.scss";

const STATUS_ICONS = {
	success: <CheckCircledIcon className={style.icon} color="var(--green-10)" />,
	warning: (
		<ExclamationTriangleIcon className={style.icon} color="var(--yellow-10)" />
	),
	error: <CrossCircledIcon className={style.icon} color="var(--red-10)" />,
} as const;

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
						{STATUS_ICONS[formatStatusCategory(status)]}
						<p className={style.text}>{title}</p>
					</GapWrapper>
				</Toast.Title>
			</Toast.Root>

			<Toast.Viewport className={style.Viewport} />
		</Toast.Provider>
	);
};
