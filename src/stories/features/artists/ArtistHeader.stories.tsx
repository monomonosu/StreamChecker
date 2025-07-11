import { Theme } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/nextjs";

import { ArtistHeader } from "@/app/(static)/artists/[artist_id]/_components/ArtistHeader";

const meta = {
	title: "Feature/Artists/ArtistHeader",
	component: ArtistHeader,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ArtistHeader>;

export default meta;
type Story = StoryObj<typeof ArtistHeader>;

export const Primary: Story = {
	render: () => (
		<Theme appearance="dark">
			<div style={{ width: "800px" }}>
				<ArtistHeader
					src="/images/no-image.png"
					alt="artist"
					artistName="artist"
				/>
			</div>
		</Theme>
	),
};

export const AtLightTheme: Story = {
	render: () => (
		<Theme>
			<div style={{ width: "800px" }}>
				<ArtistHeader
					src="/images/no-image.png"
					alt="artist"
					artistName="artist"
				/>
			</div>
		</Theme>
	),
};

export const AtSP: Story = {
	render: () => (
		<Theme appearance="dark">
			<div style={{ width: "375px" }}>
				<ArtistHeader
					src="/images/no-image.png"
					alt="artist"
					artistName="artist"
				/>
			</div>
		</Theme>
	),
};
