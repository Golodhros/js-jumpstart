// 1. Clarifying questions
// - JS
// 2. Use Cases
// - A different component wants to show a toast to give user feedback
// - The toast might need to dissapear at a given time (configurable with a smart default), provide a X button
// - The toast don't needs to be stacked (for now) - Stretch goal
// - Acessible, when it shows up, it will be read by the screen readers
// - Animated, non-janky
// - Title + Optional description (could contain a link)
// 3. States
// - Sentiment: informative/warning/error
// - Popping up, disappearing
// - Stacked (later)
// 4. API
// type Sentiment = 'error' | 'warning' | 'info';
// type ToastProps = {
//     title: string;
//     visible: boolean; // Defaults to false
//     description?: ReactNode;
//     sentiment?: Sentiment; // Defaults to 'info'
//     noCloseButton?: boolean; //Defaults to false
//     hiddenDelay?: number; // In ms, defaults to 2000
// };

// Solution
// Context based with a Provider
// type ProviderState = {
//     toasts: ToastProps[] | null;
// }

import { useEffect, useRef, useState } from "react";

const DEFAULT_DELAY = 2000;

const TestComponent = () => {
    const handleClick = () => {
        const event = new CustomEvent("new-toast", {
            detail: {
                title: "new toast",
                description: "new description",
            },
        });
        document.dispatchEvent(event);
    };

    return (
        <button type="button" onClick={handleClick}>
            Show Toast!
        </button>
    );
};

const Toast = ({
    title,
    visible = false,
    description,
    sentiment = "info",
    noCloseButton = false,
    hiddenDelay = DEFAULT_DELAY,
    stackedPosition,
    id,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    if (!isVisible) {
        return null;
    }

    const handleClose = () => {
        onClose?.(id);
        setIsVisible((visible) => !visible);
    };

    const positionStyle = {
        top: `${20 + 90 * stackedPosition}px`,
    };

    return (
        <div className="toast" style={positionStyle}>
            <div className="toast_wrapper">
                <h3>{title}</h3>
                {description && <p>{description}</p>}
            </div>
            {!noCloseButton && (
                <button
                    type="button"
                    onClick={handleClose}
                    className="toast_close-button"
                >
                    X <span className="sr-only">Close</span>
                </button>
            )}
        </div>
    );
};

const DEFAULT_TOASTS = [
    {
        id: 1,
        title: "Toast 1",
        description: "Description",
        visible: true,
    },
    {
        id: 2,
        title: "Toast 2",
        description: "Description",
        visible: true,
    },
    {
        id: 3,
        title: "Toast 3",
        description: "Description",
        visible: true,
    },
];

export const Layout = ({ children }) => {
    const documentRef = useRef(document);
    const [toasts, setToast] = useState(DEFAULT_TOASTS);

    const handleToastClose = (idToRemove) => {
        setToast((oldToasts) => {
            return oldToasts.filter(({ id }) => id !== idToRemove);
        });
    };

    const handleNewToast = (e) => {
        setToast((oldToasts) => {
            return [
                ...oldToasts,
                {
                    id: 4, // from uuid
                    visible: true,
                    ...e.detail,
                },
            ];
        });
    };

    useEffect(() => {
        if (documentRef.current) {
            documentRef.current.addEventListener("new-toast", handleNewToast);
        }

        return () => {
            documentRef.current.removeEventListener(
                "new-toast",
                handleNewToast
            );
        };
    }, []);

    return (
        <div>
            {toasts.length > 0
                ? toasts.map(({ id, title, visible, description }, idx) => {
                      return (
                          <Toast
                              key={id}
                              title={title}
                              visible={visible}
                              description={description}
                              stackedPosition={idx}
                              id={id}
                              onClose={handleToastClose}
                          />
                      );
                  })
                : null}
            <header>
                <h2>Layout Header</h2>
                <TestComponent />
            </header>
            <main>{children}</main>
        </div>
    );
};
