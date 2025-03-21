import Counter, { CounterProps } from "./Counter";

export default {
  title: "Movies/Counter",  // Component namr in Storybook
  component: Counter,       // Component for which the story is created
};

// Template for the story
const Template = (args: CounterProps) => <Counter {...args} />;

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

