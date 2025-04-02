import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Dialog from "./Dialog";
import { mockOnClose } from "../../mock-data";

vi.mock("focus-trap-react", () => {
    return {
        FocusTrap: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
});

describe("Dialog Component", () => {
    beforeEach(() => {
        mockOnClose.mockClear();
    });

    it("renders correctly with a title and children", () => {
        render(
            <Dialog title="Test Dialog" onClose={mockOnClose}>
                <p>Dialog content goes here</p>
                <input type="text" aria-label="Focusable Input" /> {/* Add tabbable node */}
            </Dialog>
        );

        expect(screen.getByText("Test Dialog")).toBeInTheDocument();
        expect(screen.getByText("Dialog content goes here")).toBeInTheDocument();
    });

    it("calls onClose when the close button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <Dialog title="Test Dialog" onClose={mockOnClose}>
                <p>Dialog content goes here</p>
                <button>Click</button>
            </Dialog>
        );

        const closeButton = screen.getByRole("button", { name: /×/i });

        await user.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("renders content inside a portal", () => {
        render(
            <Dialog title="Test Dialog" onClose={mockOnClose}>
                <p>Dialog content goes here</p>
            </Dialog>
        );

        const portalElement = document.body.querySelector(".fixed.inset-0");
        expect(portalElement).toBeInTheDocument();
        expect(portalElement).toHaveTextContent("Test Dialog");
        expect(portalElement).toHaveTextContent("Dialog content goes here");
    });

    it("renders a ReactNode as the title", () => {
        render(
            <Dialog
                title={<span data-testid="custom-title">Custom Title</span>}
                onClose={mockOnClose}
            >
                <p>Dialog content goes here</p>
            </Dialog>
        );

        expect(screen.getByTestId("custom-title")).toBeInTheDocument();
        expect(screen.getByTestId("custom-title")).toHaveTextContent("Custom Title");
    });
});
it("renders the close button with the correct label", () => {
    render(
        <Dialog title="Test Dialog" onClose={mockOnClose}>
            <p>Dialog content goes here</p>
        </Dialog>
    );

    const closeButton = screen.getByRole("button", { name: /×/i });
    expect(closeButton).toBeInTheDocument();
});

it("renders children content correctly", () => {
    render(
        <Dialog title="Test Dialog" onClose={mockOnClose}>
            <p data-testid="dialog-content">Dialog content goes here</p>
        </Dialog>
    );

    const content = screen.getByTestId("dialog-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Dialog content goes here");
});