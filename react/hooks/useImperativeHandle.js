
// From https://reactjs.org/docs/hooks-reference.html#useimperativehandle
// A parent component that renders <FancyInput ref={inputRef} /> would be able to call inputRef.current.focus()
function FancyInput(props, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
