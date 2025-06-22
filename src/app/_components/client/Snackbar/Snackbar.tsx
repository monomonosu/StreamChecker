"use client";

import {
	CheckCircledIcon,
	CrossCircledIcon,
	ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Toast } from "radix-ui";

import { BasicText } from "@/app/_styles/components/texts";
import { GapWrapper } from "@/app/_styles/components/wrappers";

import style from "./snackbar.module.scss";

import { formatStatusCategory } from "@/utils/helpers/formatStatus";

const STATUS_ICONS = {
	success: <CheckCircledIcon height={24} width={24} color="var(--green-10)" />,
	warning: (
		<ExclamationTriangleIcon height={24} width={24} color="var(--yellow-10)" />
	),
	error: <CrossCircledIcon height={24} width={24} color="var(--red-10)" />,
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
						<BasicText size={16}>{title}</BasicText>
					</GapWrapper>
				</Toast.Title>
			</Toast.Root>

			<Toast.Viewport className={style.Viewport} />
		</Toast.Provider>
	);
};
