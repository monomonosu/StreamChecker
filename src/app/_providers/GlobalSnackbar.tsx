"use client";

import { Snackbar } from "@/app/_components/client/Snackbar/Snackbar";
import { snackbarAtom } from "@/libs/stores/snackbar";
import { useSnackbar } from "@/utils/hooks/useSnackbar";
import { useSetAtom } from "jotai";

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
