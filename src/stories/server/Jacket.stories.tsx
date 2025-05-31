import type { Meta, StoryObj } from "@storybook/react";

import { Jacket } from "@/app/_components/server/Jacket/Jacket";
import { Slider } from "@/app/_styles/components/blocks";

const meta = {
	title: "Server/Jacket",
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
	{
		id: 1,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
	{
		id: 2,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
	{
		id: 3,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
	{
		id: 4,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
	{
		id: 5,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
	{
		id: 6,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
	{
		id: 7,
		src: "/images/no-image.png",
		albumName: "music",
		artistName: "artist",
	},
];

export const Primary: Story = {
	render: () => (
		<Jacket
			href="/"
			priority
			src={"/images/no-image.png"}
			album={{ name: "music", href: "/" }}
			artist={{ name: "artist", href: "/" }}
			width={200}
			height={200}
			alt="dummy"
		/>
	),
};

export const WithSlider: Story = {
	render: () => (
		<div style={{ width: "1000px" }}>
			<Slider>
				{DUMMY_IMAGES.map((image) => (
					<Jacket
						key={image.id}
						href="/"
						priority
						src={image.src}
						album={{ name: image.albumName, href: "/" }}
						artist={{ name: image.artistName, href: "/" }}
						width={200}
						height={200}
						alt="dummy"
					/>
				))}
			</Slider>
		</div>
	),
};
