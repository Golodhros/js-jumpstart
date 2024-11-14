// Data builder object
// Inspired by Growing Object-Oriented Software, Guided by Tests
// http://www.growing-object-oriented-software.com/

const defaultConfigurationInfo = {
    parameter: '1',
    parameter2: '2',
    entries: []
};

/**
 * Generates test data
 * @param {config} object
 * @example
 * let testData = new TestDataBuilder(optionalInitialConfig)
 *                         .with2Entries()
 *                         .build();
 */
// eslint-disable-next-line func-style
function TestDataBuilder(config) {
    this.Klass = TestDataBuilder;
    this.config = {
        ...defaultConfigurationInfo,
        ...config,
    };

    this.with2Entries = () => {
        let attr = {
            ...this.config,
            entries: [
                {
                    name: 'Entry1',
                    id: 0,
                },
                {
                    name: 'Entry2',
                    id: 1,
                }
            ],
        };

        return new this.Klass(attr);
    };

    this.withValidParameter = () => {
        let attr = {
            ...this.config,
            parameter: 'ValidValue',
        };

        return new this.Klass(attr);
    };

    this.withInvalidParameter = () => {
        let attr = {
            ...this.config,
            parameter: null,
        };

        return new this.Klass(attr);
    };

    // ...

    this.build = () => this.config;
}

export {
    TestDataBuilder
};
