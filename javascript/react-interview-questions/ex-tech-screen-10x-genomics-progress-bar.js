/*
Horizontal Progress Bar in the Browser

Given two JavaScript variables, total and current, can you write code that generates a horizontal progress bar with a foreground color different than the background color, that indicates how much progress has been made? The variable current represents how much has been done, and total represents how much there is to do in total. In the ASCII art below, current could be 400, and total could be 1000.

----------------------
|========            |
----------------------
Please use React to solve the problem.


Solution
I: total:number current:number
O: horizontal progress bar
C:
- foreground and background colors, different
- total and current are positive
- OK with fraction
- We know the values

S:
- Two boxes - background grey
- foreground blue
*/

import React, { useState } from "react";
import "./App.css";

const TOTAL = 500;
const CURRENT = 40;
const ADVANCE_RATIO = 10;

const ProgressBar = ({ value, total }) => {
    const valuePixels = (value / total) * 100;

    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{ width: `${valuePixels}%` }}
            ></div>
            <div className="sr-only">{`Progress bar with value ${value} out of ${total}`}</div>
        </div>
    );
};

function App() {
    const [value, setValue] = useState(CURRENT);

    const handleButtonClick = () => {
        setValue(value + ADVANCE_RATIO);
    };

    return (
        <div className="app">
            Hi from 10x Genomics!
            <div className="grid-cell">
                <ProgressBar value={value} total={TOTAL} />
                <button type="button" onClick={handleButtonClick}>
                    Add 10% Progress
                </button>
            </div>
        </div>
    );
}

export default App;

// Stylesheet
<style>
    .app {
      color: #353C4E;
      font-size: 2rem;
      font-weight: 700;
    }
    .grid-cell {
      width: 40%;
    }
    .progress-container {
      height: 20px;
      width: 100%;
      position: relative;
      background-color: grey;
    }
    .progress-bar {
      height: 20px;
      position: absolute;
      left: 0;
      background-color: blue;
    }
    .sr-only {
      opacity: 0;
    }
</style>
