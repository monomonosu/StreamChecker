"use client";

import type { CustomResponse } from "@/app/api/type";
import { formatStatusCategory } from "@/utils/helpers/formatStatus";
import { useSnackbar } from "@/utils/hooks/useSnackbar";

export const useErrorHandle = () => {
	const { openSnackbar } = useSnackbar();

	const errorHandling = (res: CustomResponse) => {
		const statusCategory = formatStatusCategory(res.status.code);

		if (statusCategory === "error") {
			openSnackbar(res.status.message, res.status.code);
		} else if (statusCategory === "warning") {
			openSnackbar(res.status.message, res.status.code);
		} else if (statusCategory === "success" && res.status.message) {
			openSnackbar(res.status.message, res.status.code);
		} else {
			openSnackbar("処理が完了しました。", res.status.code);
		}
	};

	return {
		errorHandling,
	};
};
