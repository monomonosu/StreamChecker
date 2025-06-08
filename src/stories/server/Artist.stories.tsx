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
		<div style={{ width: "150px" }}>
			<Artist
				href="/"
				fill
				priority
				src={"/images/no-image.png"}
				artist={{ name: "artist", href: "/" }}
				alt="dummy"
			/>
		</div>
	),
};

export const WithSlider: Story = {
	render: () => (
		<div style={{ width: "1000px" }}>
			<Slider>
				{DUMMY_IMAGES.map((image) => (
					<div style={{ width: "150px" }} key={image.id}>
						<Artist
							href="/"
							fill
							priority
							src={image.src}
							artist={{ name: image.artistName, href: "/" }}
							alt="dummy"
						/>
					</div>
				))}
			</Slider>
		</div>
	),
};
