import type { Meta, StoryObj } from "@storybook/nextjs";

import Loading from "@/app/_components/server/Loading/loading";

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
