const Aux = (props) => props.children;

const Fruits = () =>(
    <Aux>
        <li key="1">Apple</li>
        <li key="2">Orange</li>
        <li key="3">Pear</li>
    </Aux>);

class App extends Component {
    render() {
        return {
            <ul>
                <li>Peach</li>
                <Fruits />
            </ul>
        };
    }
}