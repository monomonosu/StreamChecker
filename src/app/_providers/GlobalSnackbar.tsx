"use client";

import { useSetAtom } from "jotai";
import { Snackbar } from "@/app/_components/client/Snackbar/Snackbar";
import { snackbarAtom } from "@/libs/stores/snackbar";
import { useSnackbar } from "@/utils/hooks/useSnackbar";

export const GlobalSnackbar = () => {
	const { snackbar } = useSnackbar();
	const setSnackbar = useSetAtom(snackbarAtom);

	return (
		<Snackbar
			snackbar={snackbar}
			onOpenChange={(isOpen) => setSnackbar((prev) => ({ ...prev, isOpen }))}
		/>
	);
};
