import React from "react";
import Icon from "./Icon";

const FlyOutContext = React.createContext();

export function FlyOut(props) {
    const [open, toggle] = React.useState(false);

    return (
        <div>
            {React.Children.map(props.children, (child) =>
                React.cloneElement(child, { open, toggle })
            )}
        </div>
    );
}

function Toggle() {
    const { open, toggle } = React.useContext(FlyOutContext);

    return (
        <div className="flyout-btn" onClick={() => toggle(!open)}>
            <Icon />
        </div>
    );
}

function List({ children }) {
    const { open } = React.useContext(FlyOutContext);
    return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
    return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

// Usage
export default function FlyoutMenu() {
    return (
        <FlyOut>
            <FlyOut.Toggle />
            <FlyOut.List>
                <FlyOut.Item>Edit</FlyOut.Item>
                <FlyOut.Item>Delete</FlyOut.Item>
            </FlyOut.List>
        </FlyOut>
    );
}

const sources = [
  "https://images.pexels.com/photos/939478/pexels-photo-939478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/162829/squirrel-sciurus-vulgaris-major-mammal-mindfulness-162829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];

function Image({ source }) {
  return (
    <div className="image-item">
      <img src={source} alt="Squirrel" />
      <FlyOutMenu />
    </div>
  );
}

export default function ImageList() {
  return sources.map((source, i) => <Image source={source} key={i} />);
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <ImageList />
    </div>
  </React.StrictMode>,
  rootElement
);
