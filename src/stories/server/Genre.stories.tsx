import type { Meta, StoryObj } from "@storybook/react";

import { Genre } from "@/app/_components/server/Genre/Genre";
import { Slider } from "@/app/_styles/components/blocks";

const meta = {
	title: "Server/Genre",
	component: Genre,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Genre>;

export default meta;
type Story = StoryObj<typeof Genre>;

const DUMMY_GENRES = [
	{
		id: 1,
		src: "/images/no-image.png",
		genreName: "genre",
	},
	{
		id: 2,
		src: "/images/no-image.png",
		genreName: "genre",
	},
	{
		id: 3,
		src: "/images/no-image.png",
		genreName: "genre",
	},
	{
		id: 4,
		src: "/images/no-image.png",
		genreName: "genre",
	},
	{
		id: 5,
		src: "/images/no-image.png",
		genreName: "genre",
	},
	{
		id: 6,
		src: "/images/no-image.png",
		genreName: "genre",
	},
	{
		id: 7,
		src: "/images/no-image.png",
		genreName: "genre",
	},
];

export const Primary: Story = {
	render: () => (
		<Genre
			href="/"
			priority
			src={"/images/no-image.png"}
			genreName="genre"
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
				{DUMMY_GENRES.map((genre) => (
					<Genre
						key={genre.id}
						href="/"
						priority
						src={genre.src}
						genreName={genre.genreName}
						width={200}
						height={200}
						alt="dummy"
					/>
				))}
			</Slider>
		</div>
	),
};
