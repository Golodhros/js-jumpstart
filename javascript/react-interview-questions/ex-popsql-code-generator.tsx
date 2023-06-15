// useCodeGenerator.ts
// Generates a random digit from min to max (inclusive)
import { useState } from "react";

const getRandomDigit = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const cache: Record<number, boolean> = {};
const queue: number[] = [];

// TODO review
const getRandomCode = (min: number, max: number, length: number): number => {
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(getRandomDigit(min, max).toString());
    }

    return parseInt(result.join(""), 10);
};
// Approach two: generate all the codes, store in an array

const COUNT_LIMIT = 20;

export const useCodeGenerator = (
    minDigit: number,
    maxDigit: number,
    codeLength: number
) => {
    const [code, setCode] = useState<number>(0);
    // Approach one: dictionary, loop until we get a non-repeated code
    // Generate a code
    // Check in the cache
    // Yes? Geenrate again
    // Not? save it and return it
    // Save it on the Queye

    // Common: storing it on a queue

    function getNextCode() {
        let newCode = getRandomCode(minDigit, maxDigit, codeLength);
        let count = 0;

        while (cache[newCode] && count < COUNT_LIMIT) {
            newCode = getRandomCode(minDigit, maxDigit, codeLength);
            count++;
        }
        cache[newCode] = true;

        if (queue.length < Object.keys(cache).length) {
            queue.push(newCode);
        } else {
            newCode = queue.shift();
        }

        console.log("getNextCode", newCode);
        console.log("cache", cache);
        console.log("queue", queue);
        setCode(newCode);
    }

    return { getNextCode, code };
};

// CodeGenerator.tsx
import React, { useState } from "react";
import { useCodeGenerator } from "./useCodeGenerator";

export const CodeGenerator = () => {
    const [minDigit, setMinDigit] = useState(1);
    const [maxDigit, setMaxDigit] = useState(4);
    const [codeLength, setCodeLength] = useState(5);
    const { code, getNextCode } = useCodeGenerator(
        minDigit,
        maxDigit,
        codeLength
    );

    const handleGenerateButton = () => {
        getNextCode();
    };

    return (
        <>
            <p>
                minDigit:{" "}
                <input
                    type="number"
                    value={minDigit}
                    onChange={(e) => setMinDigit(Number(e.currentTarget.value))}
                />
            </p>
            <p>
                maxDigit:{" "}
                <input
                    type="number"
                    value={maxDigit}
                    onChange={(e) => setMaxDigit(Number(e.currentTarget.value))}
                />
            </p>
            <p>
                codeLength:{" "}
                <input
                    type="number"
                    value={codeLength}
                    onChange={(e) =>
                        setCodeLength(Number(e.currentTarget.value))
                    }
                />
            </p>
            <button type="button" onClick={handleGenerateButton}>
                Generate Code
            </button>
            <p>{code}</p>
        </>
    );
};

export default CodeGenerator;

// App.tsx
import "./styles.css";
import CodeGenerator from "./CodeGenerator";

export default function App() {
    return (
        <div className="App">
            <h1>React Locksmith</h1>
            <CodeGenerator />
        </div>
    );
}

// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
