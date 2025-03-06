import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/app/_components/server/Header/Header";

const meta = {
	title: "Layouts/Header",
	component: Header,
	parameters: {
		layout: "fullscreen", // or `padded` by default
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
	render: () => (
		<div style={{ width: "100%" }}>
			<Header />
		</div>
	),
};
