import type { Meta, StoryObj } from "@storybook/nextjs";

import { TrackList } from "@/app/_components/client/TrackList/TrackList";

const meta = {
	title: "Client/TrackList",
	component: TrackList,
	parameters: {
		layout: "centered",
		nextjs: {
			appDirectory: true,
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof TrackList>;

export default meta;
type Story = StoryObj<typeof TrackList>;

const DUMMY_TRACKS = [
	{
		id: "1",
		index: 1,
		title: "Track 1",
		duration: "3:45",
		onClick: () => {
			alert("Track 1 clicked");
		},
	},
	{
		id: "2",
		index: 2,
		title: "Track 2",
		duration: "4:20",
		onClick: () => {
			alert("Track 2 clicked");
		},
	},
];

export const Primary: Story = {
	render: () => (
		<div style={{ width: "800px" }}>
			<TrackList tracks={DUMMY_TRACKS} />
		</div>
	),
};
