/*
For this challenge, I want you to render four cells, respectively labeled A-D.
Each cell should contain a text input that the user can type into.
Each cell should also display a number.

The user can type into each cell.
If the text input contains a number, the cell should render that number.
A cell can also contain a string satisfying the regex [A-D]+.
If the input contains letters, it should show the sum of the referenced cells.
For example, "AD" represents the sum of cell A and cell D.
*/

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

import { useState, useEffect } from "react";

const CellInput = ({ value, onValueChange }) => {
    const handleOnChange = (e) => {
        console.log("value", e.target.value);
        onValueChange(e.target.value);
    };

    return (
        <input
            className="border border-2 border-gray-60"
            type="text"
            onChange={handleOnChange}
            value={value}
        />
    );
};

const CellDisplay = ({ value }: any) => {
    return <span className="border border-2 border-green-500">{value}</span>;
};

const Cell = ({ label, cellStateValue, onChange }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const displayValue = cellStateValue.filter(
        ({ label: cellLabel }) => cellLabel === label
    )[0].value;

    const handleInputValueChange = (value: string) => {
        const parsedValue = parseInt(value, 10);

        if (isNaN(parsedValue)) {
            // Treat as a reference
            const result = value
                .split("")
                .map((cellKey) => {
                    const cell = cellStateValue.filter(
                        ({ label: cellLabel }) => cellLabel === cellKey
                    )[0];
                    console.log("cell", cell);
                    const cellValue = cell.value;

                    return parseInt(cellValue, 10);
                })
                .reduce((acc, cellValue) => {
                    return acc + cellValue;
                }, 0);
            console.log("result", result);
            onChange(result);
        } else {
            console.log("value", value);
            setInputValue(value);
        }
    };

    useEffect(() => {
        // To finish
        onChange(inputValue);
    }, [inputValue]);

    return (
        <div>
            <label>
                {label}
                <CellInput
                    value={inputValue}
                    onValueChange={handleInputValueChange}
                />
            </label>
            <CellDisplay value={displayValue} />
        </div>
    );
};

type CellState = {
    label: "A" | "B" | "C" | "D";
    value: number;
};
const initialCellDisplayValues: CellState[] = [
    {
        label: "A",
        value: 0,
    },
    {
        label: "B",
        value: 0,
    },
    {
        label: "C",
        value: 0,
    },
    {
        label: "D",
        value: 0,
    },
];

const Spreadsheet = () => {
    const [cellStateValue, setCellStateValue] = useState<CellState[]>(
        initialCellDisplayValues
    );

    const handleCellStateChange = (label: string, displayValue: number) => {
        console.log("label", label);
        console.log("displayValue", displayValue);
        const updatedState = [
            ...cellStateValue.filter(
                ({ label: cellLabel }) => cellLabel !== label
            ),
            {
                label,
                value: displayValue,
            },
        ];

        setCellStateValue(updatedState);
    };

    return (
        <div className="spreadsheet">
            <Cell
                label="A"
                cellStateValue={cellStateValue}
                onChange={(displayValue) => {
                    handleCellStateChange("A", displayValue);
                }}
            />
            <Cell
                label="B"
                cellStateValue={cellStateValue}
                onChange={(displayValue) => {
                    handleCellStateChange("B", displayValue);
                }}
            />
            <Cell
                label="C"
                cellStateValue={cellStateValue}
                onChange={(displayValue) => {
                    handleCellStateChange("C", displayValue);
                }}
            />
            <Cell
                label="D"
                cellStateValue={cellStateValue}
                onChange={(displayValue) => {
                    handleCellStateChange("D", displayValue);
                }}
            />
        </div>
    );
};

const Index = () => {
    return (
        <Main
            meta={
                <Meta
                    title="Next.js Sandbox"
                    description="Next.js Sandbox page description"
                />
            }
        >
            <h2 className="text-2xl font-bold">Spreadsheet</h2>
            <Spreadsheet />
        </Main>
    );
};

export default Index;
