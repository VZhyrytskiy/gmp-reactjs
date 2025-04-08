import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { SortControl, SortControlProps } from "./SortControl";
import { Meta, StoryFn } from "@storybook/react";
import "./../../App.css";

export default {
  title: "Movies/SortControl",
  component: SortControl,
} as Meta;

const Template: StoryFn<SortControlProps> = (args: SortControlProps) => {
  const [currentSelection, setCurrentSelection] = useState(args.currentSelection);

  const handleSelectionChange = (newValue: string) => {
    setCurrentSelection(newValue); 
    args.onSelectionChange(newValue); 
  };

  return (
    <SortControl
      currentSelection={currentSelection}
      onSelectionChange={handleSelectionChange}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    currentSelection: "RELEASE DATE",
    onSelectionChange: action("Selection changed"),
  },
};