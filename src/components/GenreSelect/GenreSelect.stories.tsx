import GenreSelect, { GenreSelectProps } from "./GenreSelect";
import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import "./GenreSelect.css"; 

export default {
    title: "Movies/GenreSelect",    
    component: GenreSelect,  
    argTypes: {
        title: { control: "text" },
        onClose: { action: "closed" },
    },       
} as Meta;

const Template: StoryFn<GenreSelectProps> = (args: GenreSelectProps) => <GenreSelect {...args} />;

export const NoSelectedGenre = {
    render: Template,
    args: {

        genre: ['all', 'documentary', 'comedy', 'horror', 'crime'],
        selectedGenre: "",
        onSelect: action("Genre selected"),
    }
};

export const WithSelectedGenre = {
    render: Template,
    args: {
        genre: ['all', 'documentary', 'comedy', 'horror', 'crime'],
        selectedGenre: "documentary",
        onSelect: action("Genre selected"),
    }
};

export const GenreSelection = {
    render: Template,
    args: {

        genre: ['all', 'documentary', 'comedy', 'horror', 'crime'],
        selectedGenre: "",
        onSelect: (genre: string) => {
            console.log(`Selected genre: ${genre}`);
        },
    }
};