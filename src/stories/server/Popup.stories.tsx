import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/nextjs";

import { Popup } from "@/app/_components/server/Popup/Popup";

const meta = {
	title: "Server/Popup",
	component: Popup,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof Popup>;

const dummyButton = (
	<IconButton color="gray" variant="ghost">
		<HamburgerMenuIcon width={24} height={24} />
	</IconButton>
);

export const Primary: Story = {
	render: () => (
		<Popup triggerContent={dummyButton}>
			<p>ここに要素が入ります。</p>
		</Popup>
	),
};

export const WithCustomContent: Story = {
	render: () => (
		<Popup triggerContent={dummyButton}>
			<div style={{ padding: "16px", backgroundColor: "#fff" }}>
				<p>ボタンを組み込む事もできます。</p>
				<IconButton color="gray" variant="solid">
					<HamburgerMenuIcon width={24} height={24} />
				</IconButton>
			</div>
		</Popup>
	),
};
