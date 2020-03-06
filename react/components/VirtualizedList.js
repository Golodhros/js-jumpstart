import React, { useState } from "react";

// Ref: https://medium.com/ingeniouslysimple/building-a-virtualized-list-from-scratch-9225e8bec120
// The way that most virtualized list components work is
// that instead of passing a list of elements to render,
// we instead provide the list with just the number of elements
// we want to render, how big each element is, and a callback which renders a single item.
//
// To use:
//
// const listProps = {
//     numItems: 1800,
//     itemHeight: 30,
//     windowHeight: 500
// };
//
// <VirtualizedList
//     {...listProps}
//     renderItem={({ index, style }) => (
//         <div key={index} style={style}>
//             Hello {index}
//         </div>
//     )}
// />

const OFFSET_ITEMS = 5;
const INITIAL_SCROLL = 0;

const VirtualizedList = (props) => {
    const { numItems, itemHeight, renderItem, windowHeight } = props;
    const [scrollTop, setScrollTop] = useState(INITIAL_SCROLL);

    // Select the list items to render
    const items = [];
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        numItems - 1, // don't render past the end of the list
        Math.floor((scrollTop + windowHeight) / itemHeight)
    );
    for (let i = (startIndex - OFFSET_ITEMS); i <= (endIndex + OFFSET_ITEMS); i++) {
        items.push(
            renderItem({
                index: i,
                style: {
                    position: "absolute",
                    top: `${i * itemHeight}px`,
                    width: "100%"
                }
            })
        );
    }

    const onScroll = e => setScrollTop(e.currentTarget.scrollTop);
    const innerHeight = numItems * itemHeight;

    return (
        <div
            className="scroll"
            style={{ overflowY: "scroll", height: `${windowHeight}px` }}
            onScroll={onScroll}
        >
            <div
                className="inner"
                style={{ position: "relative", height: `${innerHeight}px` }}
            >
                {items}
            </div>
        </div>
    );
};

export default VirtualizedList;
