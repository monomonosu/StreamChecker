import { Popover } from "@radix-ui/themes";

type PopupProps = Popover.ContentProps & {
	triggerContent: React.ReactNode;
	children: React.ReactNode;
};

export const Popup = ({ triggerContent, children, ...props }: PopupProps) => {
	return (
		<Popover.Root>
			<Popover.Trigger style={{ cursor: "pointer" }}>
				{triggerContent}
			</Popover.Trigger>

			<Popover.Content {...props}>{children}</Popover.Content>
		</Popover.Root>
	);
};
