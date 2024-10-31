// Accordion
// Clarify:
// - ES syntax, react and TS?
// - Browser support?
// Breakdown
// Functional Req
// - Click in header and opens
// - Click again in header and closes
// - Keep the markup in the DOM while closed (SEO implications)
// - Has an arrow or +/- to show the state
// - Could be part or a list of accordions
//   - Autoclose others that are open
// --------
// - Could be nested
// - Could be animated
// - Could fetch the content
//   - Empty state
//   - Loading state
//   - Error state (offline, timeout, etc.)
//
// Non-functional requirements
// - A11y - screen reader, tab navigated
// - Performance should be good
//
// State
// Open/Close and Opening/Closing
//

import { useState, useId, useEffect } from "react";
import type { ReactNode } from "react";

import "./accordion.styles.scss";

const DEFAULT_OPEN_STATE = false;
const DEFAULT_LOADING_STATE = false;

type AccordionProps = {
    children: ReactNode;
    title: string;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    isLoading?: boolean;
};

export const Accordion = ({
    children,
    title,
    isOpen = DEFAULT_OPEN_STATE,
    onToggle,
    isLoading = DEFAULT_LOADING_STATE,
}: AccordionProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const id = useId();

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleButtonClick = () => {
        setOpen((oldOpen) => {
            onToggle?.(!oldOpen);

            return !oldOpen;
        });
    };

    if (isLoading) {
        return (
            <div data-testid="@ds/accordion-container">
                <h3 data-testid="@ds/accordion-header">
                    <button type="button">Loading...</button>
                </h3>
            </div>
        );
    }

    return (
        <div data-testid="@ds/accordion-container">
            <h3 data-testid="@ds/accordion-header">
                <button
                    type="button"
                    onClick={handleButtonClick}
                    aria-expanded={open ? "true" : "false"}
                    aria-controls={`accordion-body-${id}`}
                    id={`accordion-header-${id}`}
                >
                    {title} <span aria-hidden="true">{open ? "-" : "+"}</span>
                </button>
            </h3>
            <div
                data-testid="@ds/accordion-body"
                role="region"
                aria-labelledby={`accordion-header-${id}`}
                id={`accordion-body-${id}`}
                className={open ? "is-open" : "is-closed"}
                hidden={open ? false : true}
            >
                {children}
            </div>
        </div>
    );
};

type AccordionItem = AccordionProps;
type AccordionListProps = {
    items: AccordionItem[];
    autoClose?: boolean;
};

export const AccordionList = ({ items, autoClose }: AccordionListProps) => {
    const [accordions, setAccordions] = useState(items);

    const handleItemToggle = (
        accordionIndex: number,
        onToggle?: (isOpen: boolean) => void
    ) => {
        onToggle?.(!accordions[accordionIndex].isOpen);
        setAccordions((oldState) => {
            return oldState.map((itemState, index) => {
                const defaultState = autoClose ? false : itemState.isOpen;
                const openState =
                    index === accordionIndex ? true : defaultState;

                return { ...itemState, isOpen: openState };
            });
        });
    };

    return (
        <div data-testid="@ds/accordion-list">
            {accordions.map(({ children, title, isOpen, onToggle }, index) => {
                return (
                    <Accordion
                        title={title}
                        isOpen={isOpen}
                        onToggle={() => {
                            handleItemToggle(index, onToggle);
                        }}
                        key={title}
                    >
                        {children}
                    </Accordion>
                );
            })}
        </div>
    );
};

// Ref: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
