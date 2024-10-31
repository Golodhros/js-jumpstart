import * as React from "react";
import { useEffect } from "react";

import {
    SROnly,
    Listbox,
    ListboxOption,
    ComboBoxWrapper,
    Input,
    InputContainer,
    OpenButton,
} from "./ComboBox.styles";

const optionIdForIndex = (index: number): string => `option-${index}`;

const DownChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
    >
        <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
        />
    </svg>
);

const UpChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-up"
        viewBox="0 0 16 16"
    >
        <path
            fillRule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
        />
    </svg>
);

export type ComboBoxOption = {
    label: string;
    value: string;
};

export type ComboBoxProps = {
    /**
     * Called when the user changes the text in the input field.
     */
    onChange: (text: string, value: string) => void;
    /**
     * The list of options to display in the dropdown.
     */
    options: ComboBoxOption[];
} & React.ComponentPropsWithoutRef<"input">;

/**
 * ComboBox component
 * Allows for selection of an option from a dropdown list, including a keyboard navigation
 *
 * @param {ComboBoxProps} props - The properties for the ComboBox component
 * @param {ComboBoxOption[]} props.options - The list of options to display in the dropdown
 * @param {(text: string) => void} props.onChange - Called when the user changes the text in the input field
 * @returns {React.ReactNode} The rendered ComboBox component
 * @example
 * const smallFixture = [
 * {
 *   label: 'France',
 *     value: 'FR',
 * },
 * {
 *   label: 'Germany',
 *   value: 'DE',
 * },
 * ];
 * <ComboBox options={smallFixture} onChange={(text) => {
 *  doSomething(text);
 * }} />
 */
export default function ComboBox({ onChange, options }: ComboBoxProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const [activeOptionIndex, setActiveOptionIndex] = React.useState<number>(0);
    const [originalOptions, setOriginalOptions] =
        React.useState<ComboBoxOption[]>(options);
    const [filteredOptions, setFilteredOptions] =
        React.useState<ComboBoxOption[]>(originalOptions);

    useEffect(() => {
        setFilteredOptions(
            originalOptions.filter((option) =>
                option.label.toLowerCase().includes(text.toLowerCase())
            )
        );
    }, [text, originalOptions]);

    useEffect(() => {
        setOriginalOptions(options);
    }, [options]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = () => {
        if (filteredOptions[activeOptionIndex]) {
            setText(filteredOptions[activeOptionIndex].label);
            onChange(
                filteredOptions[activeOptionIndex].value,
                filteredOptions[activeOptionIndex].label
            );
        }
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey || event.shiftKey) {
            return;
        }
        let controlKeyPressed = false;

        if (event.key === "Enter") {
            setIsOpen(false);
            handleSubmit();
            controlKeyPressed = true;
        }

        // Check if there are options to select
        if (event.key === "ArrowDown" || event.key === "Down") {
            setIsOpen(true);
            if (filteredOptions.length > 0) {
                setActiveOptionIndex((prevIndex) => {
                    let newIndex = prevIndex + 1;

                    if (prevIndex >= filteredOptions.length - 1) {
                        newIndex = 0;
                    }
                    return newIndex;
                });
            }
            controlKeyPressed = true;
        }
        if (event.key === "ArrowUp" || event.key === "Up") {
            setIsOpen(true);
            if (filteredOptions.length > 0) {
                setActiveOptionIndex((prevIndex) => {
                    let newIndex = prevIndex - 1;

                    if (prevIndex <= 0) {
                        newIndex = filteredOptions.length - 1;
                    }
                    return newIndex;
                });
            }
            controlKeyPressed = true;
        }

        if (event.key === "Escape" || event.key === "Esc") {
            setIsOpen(false);
            controlKeyPressed = true;
        }

        if (event.key === "Tab") {
            setIsOpen(false);
            controlKeyPressed = true;
        }

        if (event.key === "Home") {
            setActiveOptionIndex(0);
            controlKeyPressed = true;
        }

        if (event.key === "End") {
            setActiveOptionIndex(filteredOptions.length - 1);
            controlKeyPressed = true;
        }

        if (event.key === "PageUp") {
            setActiveOptionIndex((prevIndex) => Math.max(0, prevIndex - 5));
            controlKeyPressed = true;
        }

        if (event.key === "PageDown") {
            setActiveOptionIndex((prevIndex) =>
                Math.min(filteredOptions.length - 1, prevIndex + 5)
            );
            controlKeyPressed = true;
        }

        if (controlKeyPressed) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleOpenButtonToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    const handleOptionClick = (option: ComboBoxOption) => {
        setActiveOptionIndex(
            filteredOptions.findIndex(({ value }) => value === option.value)
        );
        setText(option.label);
        onChange(option.value, option.label);
        setIsOpen(false);
    };

    const OpenButtonIcon = isOpen ? UpChevronIcon : DownChevronIcon;
    const OpenButtonText = isOpen ? "Close Options" : "Open Options";

    return (
        <ComboBoxWrapper>
            <InputContainer>
                <Input
                    ref={inputRef}
                    value={text}
                    type="text"
                    onKeyDown={handleKeyDown}
                    onClick={handleClick}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    role="combobox"
                    aria-controls="listbox"
                    aria-autocomplete="both"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-activedescendant={
                        isOpen ? optionIdForIndex(activeOptionIndex) : undefined
                    }
                />
                <OpenButton
                    type="button"
                    onClick={handleOpenButtonToggle}
                    aria-expanded={isOpen}
                    aria-controls="listbox"
                    tabIndex={-1}
                >
                    <OpenButtonIcon /> <SROnly>{OpenButtonText}</SROnly>
                </OpenButton>
            </InputContainer>
            {filteredOptions.length > 0 && (
                <Listbox
                    id="listbox"
                    role="listbox"
                    aria-hidden={!isOpen}
                    isOpen={isOpen}
                    aria-label="Options"
                >
                    {filteredOptions.map((option, index) => (
                        <ListboxOption
                            key={option.value}
                            role="option"
                            id={optionIdForIndex(index)}
                            onClick={() => handleOptionClick(option)}
                            aria-selected={
                                filteredOptions[activeOptionIndex]?.value ===
                                option.value
                            }
                        >
                            {option.label}
                        </ListboxOption>
                    ))}
                </Listbox>
            )}
        </ComboBoxWrapper>
    );
}

// Functional Requirements
// 1. Reproduce Chrome's combobox
// - On click, focuses, content selected
// - On initial arrow down, or arrow up, the result list appears
//   - On arrow up/down, navigate the result list
//     - on focused, the option shows a X button to clear the selection
//   - On hitting tab, cycle on the list options and their x buttons
//   - On enter, the selected item is activated and the result list disappears
//   - On escape, the result list disappears
//   - On clicking outside, the result list disappears
//   - On clicking the same option, the result list disappears
//
// Non-Functional Requirements
// 1. Accessible, user can navigate with keyboard and it's announced in a screen reader
// 2. Performant, can handle 300 itemps
//
// Browswer Support: Chrome
//
// Thing's I haven't implemented:
// - Other browsers support
// - In a windows machine
// - mobile support and behavior (gestures, a11y and performance)
// - adding and handling clear buttons on both options or input field
// - handling clicks outside or hovering outside
// - allowing custom option rendering
// - haven't set up a type system to accept usual input or select element properties
// - All about disabled and read-only states
// - All about error states
//
// Things to improve
// - Opening the listbox when starting to type
// - Voiceover operation could be better
// - scrolling elements out of the viewport on long suggestion lists when they are selected
