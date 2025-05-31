import type { Meta, StoryObj } from "@storybook/react";

import { Artist } from "@/app/_components/server/Artist/Artist";
import { Slider } from "@/app/_styles/components/blocks";

const meta = {
	title: "Server/Artist",
	component: Artist,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Artist>;

export default meta;
type Story = StoryObj<typeof Artist>;

const DUMMY_IMAGES = [
	{
		id: 1,
		src: "/images/no-image.png",
		artistName: "artist",
	},
	{
		id: 2,
		src: "/images/no-image.png",
		artistName: "artist",
	},
	{
		id: 3,
		src: "/images/no-image.png",
		artistName: "artist",
	},
	{
		id: 4,
		src: "/images/no-image.png",
		artistName: "artist",
	},
	{
		id: 5,
		src: "/images/no-image.png",
		artistName: "artist",
	},
	{
		id: 6,
		src: "/images/no-image.png",
		artistName: "artist",
	},
	{
		id: 7,
		src: "/images/no-image.png",
		artistName: "artist",
	},
];

export const Primary: Story = {
	render: () => (
		<Artist
			href="/"
			priority
			src={"/images/no-image.png"}
			artist={{ name: "artist", href: "/" }}
			width={150}
			height={150}
			alt="dummy"
		/>
	),
};

export const WithSlider: Story = {
	render: () => (
		<div style={{ width: "1000px" }}>
			<Slider>
				{DUMMY_IMAGES.map((image) => (
					<Artist
						key={image.id}
						href="/"
						priority
						src={image.src}
						artist={{ name: image.artistName, href: "/" }}
						width={150}
						height={150}
						alt="dummy"
					/>
				))}
			</Slider>
		</div>
	),
};
