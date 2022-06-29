// src/currencyContext.js
import React from 'react';

const CurrencyContext = React.createContext(null);

export { CurrencyContext };

// src/app.js
import React from 'react';

import { CurrencyContext } from './currency-context';

...

const App = () => {
  return (
    <CurrencyContext.Provider value="€">
      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};

// src/book.js
const Book = ({ item }) => {
    const currency = React.useContext(CurrencyContext);

    return (
        <li>
            {item.title} - {item.price} {currency}
        </li>
    );
};


// STATEFUL CONTEXT
const App = () => {
  const [currency, setCurrency] = React.useState('€');

  return (
    <CurrencyContext.Provider value={currency}>
      <button type="button" onClick={() => setCurrency('€')}>
        Euro
      </button>
      <button type="button" onClick={() => setCurrency('$')}>
        US Dollar
      </button>

      <Books list={DATA} />
    </CurrencyContext.Provider>
  );
};


// With custom hook
import React from 'react';

const CurrencyContext = React.createContext(null);
const useCurrency = () => React.useContext(CurrencyContext);

export { CurrencyContext, useCurrency };


// With HOC for third parties
import React from 'react';

const CurrencyContext = React.createContext(null);
const useCurrency = () => React.useContext(CurrencyContext);

const withCurrency = (Component) => (props) => {
  const currency = useCurrency();

  return <Component {...props} currency={currency} />;
};

// if ref is used
//
// const withCurrency = (Component) =>
//   React.forwardRef((props, ref) => {
//     const currency = useCurrency();

//     return <Component {...props} ref={ref} currency={currency} />;
//   });

export { CurrencyContext, useCurrency, withCurrency };


// With Custom Provider as well
import React from 'react';

const CurrencyContext = React.createContext(null);
const useCurrency = () => React.useContext(CurrencyContext);

const CurrencyProvider = ({ value, children }) => {
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyProvider, useCurrency };


// With encapsulated content
import React from 'react';

const CURRENCIES = {
  Euro: {
    code: 'EUR',
    label: 'Euro',
    conversionRate: 1, // base conversion rate
  },
  Usd: {
    code: 'USD',
    label: 'US Dollar',
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

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: value.code,
  }).format(item.price * value.conversionRate);

  return (
    <li>
      {item.title} - {price}
    </li>
  );
};


// Reimplementing Redux: https://www.robinwieruch.de/redux-with-react-hooks/
