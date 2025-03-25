import SearchForm, { SearchFormProps } from "./SearchForm";
import { action } from "@storybook/addon-actions";

export default {
    title: "Movies/SearchForm",     // Component name in Storybook
    component: SearchForm,          // Component for which the story is created
};

const Template = (args: SearchFormProps) => <SearchForm {...args} />;

// Story with an empty field
export const EmptyForm = {
    render: Template,
    args: {
        searchQuery: "",
        onSearch: action("Search submitted"), // Action for the button
    },
};

// Story with a pre-filled field
export const PreFilledForm = {
    render: Template,
    args: {
        searchQuery: "React.js",
        onSearch: action("Search submitted"),
    }
};