import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@/app/_components/layouts/Slider";
import { Jacket } from "@/app/_components/server/Jacket/Jacket";

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
	{
		id: 1,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
	{
		id: 2,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
	{
		id: 3,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
	{
		id: 4,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
	{
		id: 5,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
	{
		id: 6,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
	{
		id: 7,
		src: "/images/dummy-image.png",
		musicName: "music",
		artistName: "artist",
	},
];

export const Primary: Story = {
	render: () => (
		<Jacket
			href="/"
			priority
			src={"/images/dummy-image.png"}
			music={{ name: "music", href: "/" }}
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
						music={{ name: image.musicName, href: "/" }}
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
