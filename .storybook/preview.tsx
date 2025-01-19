import React from "react";
import type { Preview } from "@storybook/react";
import '@/styles/radix-ui-styles.css'
import { Theme } from "@radix-ui/themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Theme>
          {/* @ts-ignore */}
          <Story />
        </Theme>
      );
    },
  ],
};

export default preview;
