// Asked on Lyft interview, March 2020
// https://codepen.io/team/lyftrecruiting/collab/35847f9090d42b40c2f813442279a789
console.clear();

// https://i.imgur.com/JB3Wlv5.png

// Assumptions
// -12 hr time

const getTime = () => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    return { hours, minutes, seconds };
};

const formatNumber = number => {
    return { number1: Math.floor(number / 10), number2: number % 10 };
};

const numbersMap = {
    0: [1, 2, 3, 4, 5, 6],
    1: [3, 4],
    2: [2, 3, 6, 7, 5],
    3: [2, 3, 4, 5, 7],
    4: [1, 7, 3, 4],
    5: [2, 1, 7, 4, 5],
    6: [2, 3, 4, 5, 6, 7],
    7: [2, 3, 4],
    8: [1, 2, 3, 4, 5, 6, 7],
    9: [1, 2, 3, 4, 7]
};

const Digit = ({ number }) => {
    let segments = numbersMap[number];
    console.log("segments", segments);
    // Assuming that includes is valie

    return (
        <div className="seven-segment">
            {segments.includes(1) ? (
                <svg height="50" width="200" className="seg seg-1">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}

            {segments.includes(2) ? (
                <svg height="50" width="200" className="seg seg-2">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}
            {segments.includes(3) ? (
                <svg height="50" width="200" className="seg seg-3">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}
            {segments.includes(4) ? (
                <svg height="50" width="200" className="seg seg-4">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}
            {segments.includes(5) ? (
                <svg height="50" width="200" className="seg seg-5">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}
            {segments.includes(6) ? (
                <svg height="50" width="200" className="seg seg-6">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}
            {segments.includes(7) ? (
                <svg height="50" width="200" className="seg seg-7">
                    <polygon
                        points="0 25,25 0,175 0, 200 25, 175 50, 25 50, 0 25"
                        style={{ fill: "#f04" }}
                    />
                </svg>
            ) : null}
        </div>
    );
};

const Cypher = ({ number1, number2 }) => {
    return (
        <div>
            <Digit number={number1} />
            <Digit number={number2} />
        </div>
    );
};

// <Digit number={number2} />

class Hello extends React.Component {
    render() {
        let { hours, minutes, seconds } = getTime();

        console.log("hours", formatNumber(hours).number1);
        console.log("hours", formatNumber(hours).number2);

        return (
            <div>
                <Cypher {...formatNumber(hours)} /> :
                <Cypher {...formatNumber(minutes)} /> :
                <Cypher {...formatNumber(seconds)} />
            </div>
        );
    }
}

ReactDOM.render(<Hello name="World" />, document.getElementById("container"));


// .segment {
//   width: 4px;
//   height: 20px;
//   background-color: red;
//   display: inline-block;
// }

// .is-horizontal {
//   transform: rotate(-90deg);
//   transform-origin: top left;
// }
// .is-horizontal-bottom {
//   transform: rotate(-90deg);
//   transform-origin: bottom left;
// }

// .seven-segment {
//   position: relative;
//   margin: 30px;
// }

// .seven-segment .seg {
//   position: absolute;
// }

// .seg-1 {
// }
// .seg-2 {
//   transform: rotate(90deg);
//   transform-origin: 0 center;
// }
// .seg-3 {
//   transform: rotate(90deg);
//   transform-origin: 0 center;
//   left: 200px;
// }
// .seg-4 {
//    top: 200px;
// }
// .seg-5 {
//    top: 200px;
//   transform: rotate(90deg);
//   transform-origin: 0 center;
// }
// .seg-6 {
//   top: 200px;
//   transform: rotate(90deg);
//   transform-origin: 0 center;
//   left: 200px;
// }
// .seg-7 {
//   top: 400px;
// }
