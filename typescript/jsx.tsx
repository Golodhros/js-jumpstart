
// Functional Components
// -----

// Written as a function declaration
function Heading(): React.ReactNode {
    return <h1>My Website Heading</h1>
}

// Written as a function expression
const OtherHeading: React.FC = () => <h1>My Website Heading</h1>



// Functional components with Overload
interface ClickableProps {
    children: JSX.Element[] | JSX.Element
}

interface HomeProps extends ClickableProps {
    home: JSX.Element;
}

interface SideProps extends ClickableProps {
    side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element {
    // ...
}

const MyComponent: React.FunctionComponent<Props> = (props) => {
    return <span>{props.foo}</span>
}



// Class Components
// -----
interface PropsType {
    children: JSX.Element
    name: string
}

class Component extends React.Component<PropsType, {}> {
    render() {
        return (
            <h2>
                {this.props.children}
            </h2>
        )
    }
}

// OK
<Component name="foo">
    <h1>Hello World</h1>
</Component>




// Hooks
// -----

// Type inference works great with hooks, so here:
const [value, setValue] = useState('')
// `value` is inferred as a string
// `setValue` is inferred as (newValue: string) => void


// If we need to initialize a hook with a nullish value, we use a generic type:
type User = {
    email: string;
    id: string;
}

// the generic is the < >
// the union is the User | null
// together, TypeScript knows, "Ah, user can be User or null".
const [user, setUser] = useState<User | null>(null);



// Events
// Form events, change
const MyInput = () => {
    const [value, setValue] = React.useState('')

    // The event type is a "ChangeEvent"
    // We pass in "HTMLInputElement" to the input
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value)
    }

    return <input value={value} onChange={onChange} id="input-example"/>
}


// Children
type CardProps = {
    title: string;
    children: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
    return (
        <div className="cards">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

// A custom helper type helps us to set children easier.
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type CardProps = WithChildren<{
  title: string;
}>;
