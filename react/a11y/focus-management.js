// Catching onBlur
// Ref: https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
const ChildrenBlur = ({ children, onBlur, ...props }) => {
    const handleBlur = useCallback(
        (e) => {
            const currentTarget = e.currentTarget;

            // Give browser time to focus the next element
            requestAnimationFrame(() => {
                // Check if the new focused element is a child of the original container
                if (!currentTarget.contains(document.activeElement)) {
                    onBlur();
                }
            });
        },
        [onBlur]
    );

    return (
        <div {...props} onBlur={handleBlur}>
            {children}
        </div>
    );
};

// Usage
<ChildrenBlur
    onBlur={() => {
        doSomethingCoolOnBlur();
    }}
>
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
</ChildrenBlur>;

// Tracking if first or last focusable element
// Ref: https://medium.com/@seif_ghezala/how-to-create-an-accessible-react-modal-5b87e6a27503
const handleTabKey = (e) => {
    const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
        firstElement.focus();
        return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
        lastElement.focus();
        e.preventDefault();
    }
};
