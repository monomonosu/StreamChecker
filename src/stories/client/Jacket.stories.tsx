import type { Meta, StoryObj } from "@storybook/react";

import { Jacket } from "@/app/_components/client/Jacket/Jacket";
import { JacketSlider } from "@/app/_components/layouts/Slider";

const meta = {
	title: "Client/Jacket",
	component: Jacket,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Jacket>;

export default meta;
type Story = StoryObj<typeof Jacket>;

const DUMMY_IMAGES = [
	{ id: 1, src: "/images/dummy-image.png" },
	{ id: 2, src: "/images/dummy-image.png" },
	{ id: 3, src: "/images/dummy-image.png" },
	{ id: 4, src: "/images/dummy-image.png" },
	{ id: 5, src: "/images/dummy-image.png" },
	{ id: 6, src: "/images/dummy-image.png" },
	{ id: 7, src: "/images/dummy-image.png" },
	{ id: 7, src: "/images/dummy-image.png" },
	{ id: 7, src: "/images/dummy-image.png" },
	{ id: 7, src: "/images/dummy-image.png" },
];

export const Primary: Story = {
	render: () => (
		<Jacket
			href="/"
			priority
			src={"/images/dummy-image.png"}
			width={200}
			height={200}
			alt="dummy"
		/>
	),
};

export const WithSlider: Story = {
	render: () => (
		<div style={{ width: "1000px" }}>
			<JacketSlider>
				{DUMMY_IMAGES.map((image) => (
					<Jacket
						href="/"
						key={image.id}
						priority
						src={image.src}
						width={200}
						height={200}
						alt="dummy"
					/>
				))}
			</JacketSlider>
		</div>
	),
};
