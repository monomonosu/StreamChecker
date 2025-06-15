import type { Meta, StoryObj } from "@storybook/nextjs";

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
		<div style={{ width: "200px" }}>
			<Jacket
				href="/"
				fill
				priority
				src={"/images/no-image.png"}
				album={{ name: "music", href: "/" }}
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
					<div style={{ width: "200px" }} key={image.id}>
						<Jacket
							href="/"
							fill
							priority
							src={image.src}
							album={{ name: image.albumName, href: "/" }}
							artist={{ name: image.artistName, href: "/" }}
							alt="dummy"
						/>
					</div>
				))}
			</Slider>
		</div>
	),
};
