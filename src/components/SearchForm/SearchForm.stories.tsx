import SearchForm from "./SearchForm";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

export default {
    title: "Movies/SearchForm",     // Component name in Storybook
    component: SearchForm,          // Component for which the story is created
} as Meta;

const Template: StoryFn = (args, { initialPath }) => (
    <MemoryRouter
        initialEntries={[
            initialPath || "/?query=", 
        ]}
    >
        <SearchForm />
    </MemoryRouter>
);

// Story with an empty field
export const EmptyForm = {
    render: Template,
    parameters: {
        initialPath: "/?query=", 
    },
};

// Story with a pre-filled field
export const PreFilledForm = {
    render: Template,
    parameters: {
        initialPath: "/?query=React.js", 
    },
};