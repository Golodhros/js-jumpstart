// src/ThemeContext.js
import React from "react";

const ThemeContext = React.createContext(null);

export default ThemeContext;

// src/ComponentA.js
import React from "react";
import ThemeContext from "./ThemeContext";

const A = () => (
    <ThemeContext.Provider value="green">
        <D />
    </ThemeContext.Provider>
);

// src/ComponentC.js
import React from "react";
import ThemeContext from "./ThemeContext";

const C = () => (
    <ThemeContext.Consumer>
        {(value) => <p style={{ color: value }}>Hello World</p>}
    </ThemeContext.Consumer>
);
