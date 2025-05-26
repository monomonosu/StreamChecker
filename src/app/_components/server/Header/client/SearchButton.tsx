"use client";

import { MagnifyingGlassIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { IconButton, Popover, TextField } from "@radix-ui/themes";
import Form from "next/form";

import { GapWrapper } from "@/app/_styles/components/wrappers";

export const Search = () => {
	return (
		<Popover.Root>
			<Popover.Trigger>
				<IconButton variant="ghost">
					<MagnifyingGlassIcon color="white" width={24} height={24} />
				</IconButton>
			</Popover.Trigger>

			<Popover.Content>
				<Form action="/search">
					<GapWrapper gap={8} direction="row">
						<TextField.Root
							placeholder="何をお探しですか？"
							name="query"
							style={{ width: "300px" }}
						>
							<TextField.Slot>
								<MagnifyingGlassIcon height="16" width="16" />
							</TextField.Slot>
						</TextField.Root>

						<IconButton type="submit" color="gray">
							<PaperPlaneIcon width={16} height={16} />
						</IconButton>
					</GapWrapper>
				</Form>
			</Popover.Content>
		</Popover.Root>
	);
};
