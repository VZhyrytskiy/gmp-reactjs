import { PropsWithChildren, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Dialog, { DialogProps } from "./Dialog";
import MovieForm from "../MovieForm/MovieForm";
import { Movie } from "../../models/Movie";

export default {
    title: "Movies/Dialog",
    component: Dialog,
} as Meta;

const Template: StoryFn<PropsWithChildren<DialogProps>> = (args: PropsWithChildren<DialogProps>) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        args.onClose();
    };

    return (
        <>
            {isOpen && (
                <Dialog {...args} onClose={handleClose} title={args.title || "Default Title"}>
                    <p>This is the content of the dialog.</p>
                </Dialog>
            )}
            {!isOpen && (
                <button onClick={() => setIsOpen(true)}>Open Dialog</button>
            )}
        </>
    );
};

export const Default = {
    render: Template,
    args: {

        title: "Default Dialog",
    }
};

export const WithCustomTitle = {
    render: Template,
    args: {
        title: <span style={{ color: "red" }}>Custom Title</span>,
    }
};

export const AddMovie = {
    render: (args: PropsWithChildren<DialogProps>) => {
        const [isOpen, setIsOpen] = useState(true);

        const handleClose = () => {
            setIsOpen(false);
            args.onClose?.();
        };

        return (
            <>
                {isOpen && (
                    <Dialog {...args} onClose={handleClose} title="Add Movie">
                        <MovieForm onSubmit={function (movie: Movie): void {
                            throw new Error("Function not implemented.");
                        } } />
                    </Dialog>
                )}
                {!isOpen && (
                    <button onClick={() => setIsOpen(true)}>Open Add Movie Dialog</button>
                )}
            </>
        );
    },
    args: {},
};

export const EditMovie = {
    render: (args: PropsWithChildren<DialogProps>) => {
        const [isOpen, setIsOpen] = useState(true);

        const handleClose = () => {
            setIsOpen(false);
            args.onClose?.();
        };

        const initialValues: Movie = {
            title: "Inception",
            release_date: "2010-07-16",
            poster_path: "https://example.com/poster.jpg",
            vote_average: 8.8,
            genres: ["action", "sci-fi"],
            runtime: 148,
            overview: "A mind-bending thriller.",
        };

        return (
            <>
                {isOpen && (
                    <Dialog
                        {...args}
                        onClose={handleClose}
                        title="Edit Movie"
                        
                    >
                        <MovieForm initialValues={initialValues} onSubmit={function (movie: Movie): void {
                            throw new Error("Function not implemented.");
                        } } />
                    </Dialog>
                )}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Open Edit Movie Dialog
                    </button>
                )}
            </>
        );
    },
    args: {},
};

export const DeleteMovie = {
    render: (args: PropsWithChildren<DialogProps>) => {
        const [isOpen, setIsOpen] = useState(true);

        const handleClose = () => {
            setIsOpen(false);
            args.onClose?.();
        };

        return (
            <>
                {isOpen && (
                    <Dialog
                        {...args}
                        onClose={handleClose}
                        title="Delete Movie"
                    >
                        <p className="text-white-700">Are you sure you want to delete this movie?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </Dialog>
                )}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Open Delete Movie Dialog
                    </button>
                )}
            </>
        );
    },
    args: {},
};