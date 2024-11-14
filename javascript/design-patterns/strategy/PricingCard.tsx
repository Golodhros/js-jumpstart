import React from "react";

import { PriceStrategy } from "./strategies";

interface PricingCardProps {
    price: number;
    strategy: PriceStrategy;
}

const PricingCardHeader = () => {
    return (
        <div>
            <h2>Lifetime</h2>
            <p>Get the party started.</p>
        </div>
    );
};

interface PricingCardBodyProps {
    price: number;
    strategy: PriceStrategy;
}

const PricingCardBody: React.FC<PricingCardBodyProps> = ({
    price,
    strategy,
}) => {
    return (
        <div>
            <h1>{strategy.formatPrice(price)}</h1>
            {strategy.shouldDiscount() && (
                <div>{strategy.getDiscountMessage(price)}</div>
            )}
            <p>
                Learn the essential skills for modern fullstack app development.
            </p>
            <button>Get started</button>
        </div>
    );
};

export const PricingCard: React.FC<PricingCardProps> = ({
    price,
    strategy,
}) => {
    return (
        <div>
            <PricingCardHeader />
            <div />
            <PricingCardBody price={price} strategy={strategy} />
        </div>
    );
};
