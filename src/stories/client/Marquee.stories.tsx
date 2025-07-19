import type { Meta, StoryObj } from "@storybook/nextjs";

import { Marquee } from "@/app/_components/client/Marquee/Marquee";

const meta = {
	title: "Client/Marquee",
	component: Marquee,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof Marquee>;

export const Primary: Story = {
	render: () => (
		<div style={{ width: "800px" }}>
			<Marquee>
				<p style={{ color: "black" }}>
					これはテストのためのマルキーコンポーネントです。ここに長いテキストを入れて、スクロールする様子を確認できます。これはテストのためのマルキーコンポーネントです。ここに長いテキストを入れて、スクロールする様子を確認できます。これはテストのためのマルキーコンポーネントです。ここに長いテキストを入れて、スクロールする様子を確認できます。
				</p>
			</Marquee>
		</div>
	),
};
