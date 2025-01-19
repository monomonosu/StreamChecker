import { Button } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "RadixUi/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: "Click me",
	},
};

export const GrayOutline: Story = {
	render: () => (
		<Button color="gray" variant="outline" highContrast>
			Click me
		</Button>
	),
};
