// Ref: https://www.patterns.dev/posts/hoc-pattern/
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' };

    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
