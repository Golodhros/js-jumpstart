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
