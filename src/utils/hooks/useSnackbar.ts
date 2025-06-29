"use client";

import { useAtom } from "jotai";

import { snackbarAtom } from "@/libs/stores/snackbar";

export const useSnackbar = () => {
	const [snackbar, setSnackbar] = useAtom(snackbarAtom);

	const openSnackbar = (title: string, status = 200) => {
		setSnackbar({
			isOpen: true,
			status,
			title,
		});
	};

	const closeSnackbar = () => {
		setSnackbar((prev) => ({
			...prev,
			isOpen: false,
		}));
	};

	return {
		snackbar,
		openSnackbar,
		closeSnackbar,
	};
};
