import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const DEFAULT_VALUE = 100;
const SECOND_IN_MILLISECONDS = 1000;

type CounterType = {
    initialValue: number;
};

function Counter({ initialValue }: CounterType): React.ReactElement {
    const [value, setValue] = useState<number>(initialValue);
    const intervalId = useRef<any>();

    if (initialValue < 0) {
        console.error("Initial count needs to be positive");
        return null;
    }

    const setTimer = (value, setValue) => {
        if (value === 0) {
            return;
        }

        let id = setTimeout(() => {
            console.log("Now!");
            setValue((value) => value - 1);

            id = setTimer(value, setValue);
        }, SECOND_IN_MILLISECONDS);

        intervalId.current = id;

        return id;
    };

    useEffect(() => {
        // SetInterval approach
        // intervalId.current = setInterval(() => {
        //   setValue((value) => value-1);
        // }, SECOND_IN_MILLISECONDS);
        setTimer(value, setValue);

        return () => {
            if (intervalId.current) {
                clearTimeout(intervalId.current);
                // clearInterval(intervalId.current);
            }
        };
    }, []);

    useEffect(() => {
        if (value === 0 && intervalId.current) {
            clearTimeout(intervalId.current);
        }
    }, [value]);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleButtonClick = () => {
        console.log("Stop!", intervalId);
        if (intervalId.current) {
            clearTimeout(intervalId.current);
        }
    };

    return (
        <div>
            <h2>Counter</h2>
            <div>{value}</div>
            <button type="button" onClick={handleButtonClick}>
                Stop
            </button>
        </div>
    );
}

function App() {
    const [counterValue, setCounterValue] = useState<number>(DEFAULT_VALUE);

    // To Test if the values get updated when the parent changes the prop
    // useEffect(() => {
    //   setTimeout(() => {
    //     setCounterValue(200);
    //   }, 2000)
    // }, []);

    return (
        <div className="app">
            <div className="content">
                <Counter initialValue={counterValue} />
            </div>
        </div>
    );
}

export default App;

// Errors:
// Type for setTimeout, solution do NodeJS.Timer or use window.setTimeout, as it returns a number
// Recursion with the setTimeout to create an interval

// A stopwatch implementation from https://dmitripavlutin.com/react-useref/
import { useRef, useState, useEffect } from "react";

function Stopwatch() {
    const timerIdRef = useRef(0);
    const [count, setCount] = useState(0);

    const startHandler = () => {
        if (timerIdRef.current) {
            return;
        }
        timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
    };

    const stopHandler = () => {
        clearInterval(timerIdRef.current);
        timerIdRef.current = 0;
    };

    useEffect(() => {
        return () => clearInterval(timerIdRef.current);
    }, []);

    return (
        <div>
            <div>Timer: {count}s</div>
            <div>
                <button onClick={startHandler}>Start</button>
                <button onClick={stopHandler}>Stop</button>
            </div>
        </div>
    );
}
