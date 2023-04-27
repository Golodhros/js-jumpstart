// Reference: https://dev.to/itshugo/applying-design-patterns-in-react-strategy-pattern-enn
import React from "react";

import { PricingCard } from "./PricingCard";
import {
    StandardPriceStrategy,
    VietnamPriceStrategy,
    JapanPriceStrategy,
} from "./strategies";

export default function App() {
    return (
        <div className="App">
            <PricingCard price={55} strategy={new StandardPriceStrategy()} />
            <PricingCard
                price={1365000}
                strategy={new VietnamPriceStrategy()}
            />
            <PricingCard price={7669} strategy={new JapanPriceStrategy()} />
        </div>
    );
}
