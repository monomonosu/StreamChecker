import { MagnifyingGlassIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import Form from "next/form";

import { GapWrapper } from "@/app/_styles/components/wrappers";
import { PATH } from "@/utils/constants/path";

export const SearchForm = () => {
	return (
		<Form action={PATH.SEARCH}>
			<GapWrapper gap={8} direction="row">
				<TextField.Root
					placeholder="何をお探しですか？"
					name="query"
					style={{ width: "500px" }}
				>
					<TextField.Slot>
						<MagnifyingGlassIcon height="16" width="16" />
					</TextField.Slot>
				</TextField.Root>

				<IconButton type="submit" color="gray" variant="solid" highContrast>
					<PaperPlaneIcon width={16} height={16} />
				</IconButton>
			</GapWrapper>
		</Form>
	);
};
