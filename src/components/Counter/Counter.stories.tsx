import Counter, { CounterProps } from "./Counter";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Movies/Counter",  // Component name in Storybook
  component: Counter,       // Component for which the story is created
} as Meta;

// Template for the story
const Template: StoryFn = (args: CounterProps) => <Counter {...args} />;

// Story with an empty field
export const Default = {
    render: Template,
    args: {},
  };

// Story with an initial value
export const WithInitialValue = {
  render: Template,
  args: {
    initialValue: 10, // Initial value
  },
};

