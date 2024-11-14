// Implement a Clock
// Clarification
// - TS? React? Latest JS? Chrome support?
// Requirements
// Core features
// - Showing the time with seconds
// - Show and toggle the AM/PM or hr
// - Allow different time formats
// Stretch
// - Animated the numbers coming
// - Allow different timezones
// - Select formatting depending on the browser locale
// - Screen reader to read the time
// - Add miliseconds
// - Keep the format preference for users in the browser
// Non functional
// - Peformance, accessibility, User experience

// Breakdown
// Clock
//  4 x <Number />
//  <Separator />
//  AM/PM or hr <FormatDisplay />
//  Change format <Controls />

// State
// Current time
// Format

// Testing
// Add tests for formatTime
// Mocking clocks and testing the component
// Visual regression testing on numbers

import { useEffect, useState, useRef, useCallback } from "react";
import "./clock.styles.scss";

const ONE_SECOND_IN_MILISECONDS = 1000;

type timeDestructured = {
    hours: number[];
    minutes: number[];
    seconds: number[];
};

const formatTime = (time: Date, format: "AM/PM" | "24hr"): timeDestructured => {
    const rawHours = time.getHours();
    const hours = format === "AM/PM" ? rawHours % 12 : rawHours;
    const shiftedHours = hours < 10 ? `0${hours.toString()}` : hours.toString();

    const minutes = time.getMinutes();
    const shiftedMinutes =
        minutes < 10 ? `0${minutes.toString()}` : minutes.toString();

    const rawSeconds = time.getSeconds();
    const shirtedSeconds =
        rawSeconds < 10 ? `0${rawSeconds.toString()}` : rawSeconds.toString();

    return {
        hours: shiftedHours.split("").map((s) => parseInt(s, 10)),
        minutes: shiftedMinutes.split("").map((s) => parseInt(s, 10)),
        seconds: shirtedSeconds.split("").map((s) => parseInt(s, 10)),
    };
};

type ClockProps = {
    format: "AM/PM" | "24hr";
};
type NumberProps = {
    value: number;
};
const Number = ({ value }: NumberProps) => {
    return value;
};

type SeparatorProps = {
    type: "minutes" | "seconds";
};
const Separator = ({ type }: SeparatorProps) => {
    if (type === "minutes") {
        return ":";
    }
    return ".";
};

type FormatDisplayProps = {
    format: "AM/PM" | "24hr";
    time: Date;
};
const FormatDisplay = ({ format, time }: FormatDisplayProps) => {
    if (format === "24hr") {
        return " 24hr";
    }
    return time.getHours() > 12 ? " PM" : " AM";
};

type ControlsProps = {
    format: "AM/PM" | "24hr";
    onFormatChange: (newFormat: "AM/PM" | "24hr") => void;
};
const Controls = ({ format, onFormatChange }: ControlsProps) => {
    const buttonLabel = format === "AM/PM" ? "24hr" : "AM/PM";

    const handleFormatChange = () => {
        onFormatChange(format === "AM/PM" ? "24hr" : "AM/PM");
    };

    return (
        <button
            type="button"
            className="format-btn"
            onClick={handleFormatChange}
        >
            {buttonLabel}
        </button>
    );
};

export const Clock = ({ format }: ClockProps) => {
    const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [displayFormat, setDisplayFormat] = useState(format);
    const [time, setTime] = useState(new Date());
    const { seconds, minutes, hours } = formatTime(time, displayFormat);

    const handleDisplayFormatChage = (newFormat: "AM/PM" | "24hr") => {
        setDisplayFormat(newFormat);
    };

    const starTimeout = useCallback(() => {
        return setTimeout(() => {
            setTime(new Date());
            timerIdRef.current = starTimeout();
        }, ONE_SECOND_IN_MILISECONDS);
    }, []);

    useEffect(() => {
        timerIdRef.current = starTimeout();

        return () => {
            if (timerIdRef?.current) {
                clearTimeout(timerIdRef.current);
            }
        };
    }, [starTimeout]);

    return (
        <div className="clock-container">
            <Number value={hours[0]} />
            <Number value={hours[1]} />
            <Separator type="minutes" />
            <Number value={minutes[0]} />
            <Number value={minutes[1]} />
            <Separator type="seconds" />
            <Number value={seconds[0]} />
            <Number value={seconds[1]} />
            <FormatDisplay format={displayFormat} time={time} />
            <Controls
                format={displayFormat}
                onFormatChange={handleDisplayFormatChage}
            />
        </div>
    );
};
