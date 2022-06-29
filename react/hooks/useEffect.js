//accepts two arguments: a function, and dependency array
useEffect(() => {
    // do stuff
    return () => {}; //function to undo our stuff from above when component unmounts
}, []); //dependency array of things to watch for changes on

// Basic useEffect
function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });
}

// With Subscription
useEffect(() => {
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
        ChatAPI.unsubscribeFromFriendStatus(
            props.friend.id,
            handleStatusChange
        );
    };
});

// Optimized to run when a value changes
// (works as well in subscription effects)
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes

// Run and clean only once (mount and unmount)
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, []);

// Fetching data with useEffect
// Also, avoids setting state on unmounted components
const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" });

            try {
                const result = await axios(url);

                if (!didCancel) {
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: "FETCH_FAILURE" });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url]);

    return [state, setUrl];
};

// Execute on mount, only once
const executedRef = useRef(false);

useEffect(
    () => {
        if (executedRef.current) {
            return;
        }

        doSomething();

        executedRef.current = true;
    },
    [
        /*...*/
    ]
);
