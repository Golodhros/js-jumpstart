import { useRef } from "react";

// Basic use as mutable values
function MyComponent() {
    const reference = useRef(initialValue);
    const someHandler = () => {
        // Access reference value:
        const value = reference.current;
        // Update reference value:
        reference.current = newValue;
    };
    // ...
}

// Use case: Log button clicks
function LogButtonClicks() {
    const countRef = useRef(0);

    const handle = () => {
        countRef.current++;
        console.log(`Clicked ${countRef.current} times`);
    };
    console.log("I rendered!");
    return <button onClick={handle}>Click me</button>;
}

// Use case: Keeping an interval reference to implement a stopwatch
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

// Use case: Stopwatch with pause
function StopWatch() {
    const [milliSeconds, setMilliSeconds] = useState(0);
    const [ticking, setTicking] = useState(false);
    // 1. Get the ref for the CURRENT INSTANCE of the component
    const interval = useRef();
    useEffect(() => {
        if (ticking) {
            // 2. Update the value via ".current"
            interval.current = setInterval(() => {
                setMilliSeconds((ms) => ms + 1);
            }, 1);
            return () => clearInterval(interval.current);
        } else {
            // 3. Access the value via ".current"
            interval.current && clearInterval(interval.current);
        }
    }, [ticking]);
    return (
        <div className="App">
            <h1>{format(milliSeconds)}</h1>
            <button onClick={() => setTicking((c) => !c)}>
                {milliSeconds === 0 ? "Start" : ticking ? "Pause" : "Resume"}
            </button>
        </div>
    );
}

// Use case: Press and hold
function LikeButton(params) {
    const [mouseDown, setMouseDown] = useState(false);
    const [likes, setLikes] = useState(0);
    const holdDetectionTimeoutRef = useRef();
    const intervalRef = useRef(0);
    useEffect(() => {
        if (mouseDown) {
            holdDetectionTimeoutRef.current = setTimeout(() => {
                // start increasing like count
                intervalRef.current = setInterval(() => {
                    setLikes((l) => l + 1);
                }, 100);
            }, 500);
            // Don't forget to clear both the timeout and interval
            // in the clean up function of "useEffect".
            return () => {
                holdDetectionTimeoutRef.current &&
                    clearTimeout(holdDetectionTimeoutRef.current);
                intervalRef.current && clearInterval(intervalRef.current);
            };
        } else {
            holdDetectionTimeoutRef.current &&
                clearTimeout(holdDetectionTimeoutRef.current);
            intervalRef.current && clearInterval(intervalRef.current);
        }
    }, [mouseDown]);

    // set mouseDown in onMouseDown and onMouseUp
    return (
        <div className="App">
            <button
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
            >
                Press and Hold
            </button>
        </div>
    );
}

// Use case: previous value
function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = useRef(0);
    useEffect(() => {
        // This runs every time AFTER Counter is rendered.
        prevCount.current = count;
    });
    return (
        <div className="flex flex-col justify-center items-center m-8">
            <div>
                Prev: {prevCount.current}, Count: {count}
            </div>
            <button
                className="bg-purple-700 px-6 text-white rounded-md hover:bg-purple-500"
                onClick={() => setCount((c) => c + 1)}
            >
                +1
            </button>
        </div>
    );
}

// Use case: Access a DOM element
function AccessingElement() {
    const elementRef = useRef();
    useEffect(() => {
        const divElement = elementRef.current;
        console.log(divElement); // logs <div>I'm an element</div>
    }, []);
    return <div ref={elementRef}>I'm an element</div>;
}

// Use case: Focusing an input
function InputFocus() {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return <input ref={inputRef} type="text" />;
}

// Restrictions
// Update references always on handlers or useEffect hooks
function MyComponent({ prop }) {
    const myRef = useRef(0);
    useEffect(() => {
        myRef.current++; // Good!
        setTimeout(() => {
            myRef.current++; // Good!
        }, 1000);
    }, []);
    const handler = () => {
        myRef.current++; // Good!
    };
    myRef.current++; // Bad!
    if (prop) {
        myRef.current++; // Bad!
    }
    return <button onClick={handler}>My button</button>;
}

// In Depth
// useRef is equivalent to this custom hook using useState
function usePersistentValue(initialValue) {
    return React.useState({
        current: initialValue,
    })[0];
}

// We could force a re-render after updating a ref by using
const [, setForceUpdate] = useState(Date.now());

useEffect(() => {
    setTimeout(() => {
        user.current = "NewValue";

        setForceUpdate();
    }, 1000);
});
