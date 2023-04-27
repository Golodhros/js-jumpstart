// With encapsulated content
import React from "react";

const CURRENCIES = {
    Euro: {
        code: "EUR",
        label: "Euro",
        conversionRate: 1, // base conversion rate
    },
    Usd: {
        code: "USD",
        label: "US Dollar",
        conversionRate: 1.19,
    },
};

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

    return (
        <CurrencyContext.Provider value={[currency, setCurrency]}>
            {children}
        </CurrencyContext.Provider>
    );
};

const useCurrency = () => {
    const [currency, setCurrency] = React.useContext(CurrencyContext);

    const handleCurrency = (value) => {
        setCurrency(value);
    };

    return { value: currency, onChange: handleCurrency };
};

export { CurrencyProvider, useCurrency, CURRENCIES };

// using it as:
const App = () => {
    return (
        <CurrencyProvider>
            <CurrencyButtons />
            <Books list={DATA} />
        </CurrencyProvider>
    );
};

const CurrencyButtons = () => {
    const { onChange } = useCurrency();

    return Object.values(CURRENCIES).map((item) => (
        <CurrencyButton key={item.label} onClick={() => onChange(item)}>
            {item.label}
        </CurrencyButton>
    ));
};

// ...

const Book = ({ item }) => {
    const { value } = useCurrency();

    const price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: value.code,
    }).format(item.price * value.conversionRate);

    return (
        <li>
            {item.title} - {price}
        </li>
    );
};
