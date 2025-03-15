import type { Meta, StoryObj } from "@storybook/react";

import { Loading } from "@/app/_components/layouts/Loading";

const meta = {
	title: "Layouts/Loading",
	component: Loading,
	parameters: {
		layout: "fullscreen", // or `padded` by default
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
	render: () => <Loading />,
};
