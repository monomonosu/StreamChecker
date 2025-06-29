import { atom } from "jotai";

export type SnackbarType = {
	isOpen: boolean;
	status: number;
	title: string;
};

export const snackbarInitValue: SnackbarType = {
	isOpen: false,
	status: 200,
	title: "",
};

export const snackbarAtom = atom(snackbarInitValue);
