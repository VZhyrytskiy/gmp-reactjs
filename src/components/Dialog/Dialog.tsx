import { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import { FocusTrap } from "focus-trap-react";

export interface DialogProps {
    title: string | ReactNode; // string or JSX element
    onClose: () => void;
}

function Dialog(props: PropsWithChildren<DialogProps>) {
    const { title, onClose, children } = props;

    return (
        <div>
            {/* 
                I don't know why but Portal from react-portal library sometimes works sometimes doesn't work
                So I decided to use createPortal from react-dom library instead 
            */}
            {createPortal(
                <FocusTrap>
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="bg-dark-gray rounded-lg p-8 shadow-lg text-white">
                        {/* HEADER */}
                        <div className="flex justify-between items-center text-4xl mb-3 uppercase">
                            {title}
                            <button onClick={onClose} className="bg-none border-none text-lg cursor-pointer">
                                ×
                            </button>
                        </div>
                        {/* CONTENT */}
                        <div>{children}</div>
                        <button tabIndex={0} style={{ visibility: "hidden" }}>Fix FocusTrap for dynamic content</button>
                    </div>
                </div>
                </FocusTrap>,
                document.body
            )}
        </div>
    );
}

export default Dialog;