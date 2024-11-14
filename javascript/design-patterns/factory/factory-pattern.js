// Reference: https://dev.to/shadid12/react-js-with-factory-pattern-building-complex-ui-with-ease-1ojf
function A() {
    return <div>Type A Component</div>;
}

function B() {
    return <div>Type B Component</div>;
}

function C() {
    //  ...
}

function D() {
    //  ...
}

function Factory({ component }) {
    switch (component.type) {
        case "A":
            return <A />;
        case "B":
            return <B />;
        case "C":
            return <C />;
        default:
            return <div>Reload...</div>;
    }
}

const user = {
    name: "john doe",
    items: [
        {
            title: "Card 1",
            details: {
                // ...more info
            },
            type: "A",
        },
        {
            title: "Card 2",
            details: {
                // ...more info
            },
            type: "B",
        },
        {
            title: "Card 3",
            details: {
                // ...more info
            },
            type: "C",
        },
        {
            title: "Card 4",
            details: {
                // ...more info
            },
            type: "D",
        },
    ],
};

return (
    <div>
        {items.map((item) => (
            <Factory component={item} />
        ))}
    </div>
);
