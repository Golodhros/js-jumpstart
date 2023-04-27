import { Country, Currency } from "./types";

abstract class PriceStrategy {
    protected country: Country = Country.AMERICA;
    protected currency: Currency = Currency.USD;
    protected discountRatio = 0;

    getCountry(): Country {
        return this.country;
    }

    formatPrice(price: number): string {
        return [this.currency, price.toLocaleString()].join("");
    }

    getDiscountAmount(price: number): number {
        return price * this.discountRatio;
    }

    getFinalPrice(price: number): number {
        return price - this.getDiscountAmount(price);
    }

    shouldDiscount(): boolean {
        return this.discountRatio > 0;
    }

    getDiscountMessage(price: number): string {
        const formattedDiscountAmount = this.formatPrice(
            this.getDiscountAmount(price)
        );

        return `It's lucky that you come from ${this.country}, because we're running a program that discounts the price by ${formattedDiscountAmount}.`;
    }
}

class StandardPriceStrategy extends PriceStrategy {}

class VietnamPriceStrategy extends PriceStrategy {
    constructor() {
        super();
        this.country = Country.VIETNAM;
        this.currency = Currency.VND;
        this.discountRatio = 0.4;
    }

    formatPrice(price: number) {
        return [price.toLocaleString(), Currency.VND].join(" ");
    }

    getDiscountMessage(price: number): string {
        const formattedDiscountAmount = this.formatPrice(
            this.getDiscountAmount(price)
        );

        return `The price has been discounted by ${formattedDiscountAmount} because you come from Vietnam.`;
    }
}

class JapanPriceStrategy extends PriceStrategy {
    constructor() {
        super();
        this.country = Country.JAPAN;
        this.currency = Currency.YEN;
        this.discountRatio = 0.2;
    }

    getDiscountMessage(price: number): string {
        const formattedDiscountAmount = this.formatPrice(
            this.getDiscountAmount(price)
        );

        return `We have discounted the price by ${formattedDiscountAmount} thanks to the support from Japan's government.`;
    }
}

export {
    PriceStrategy,
    JapanPriceStrategy,
    VietnamPriceStrategy,
    StandardPriceStrategy,
};
