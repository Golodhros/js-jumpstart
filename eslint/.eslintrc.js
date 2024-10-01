// Enforce the extra/new rules from the code styleguide
// Reference:
// - Styleguide link

const STYLE_FILES = ["**/?(*.)styled.ts?(x)"];
const STORY_FILES = ["**/?(*.)story.ts?(x)"];
const CONSTANTS_FILES = ["**/constants.ts"];
const UNIT_TEST_FILES = ["**/?(*.)test.ts?(x)"];
const INTEGRATION_TEST_FILES = ["**/?(*.)spec.ts?(x)"];
const TEST_FILES = [...UNIT_TEST_FILES, ...INTEGRATION_TEST_FILES];

// Instructions:
// 1. Make a copy of this file into the folder you want the rules to be applied
// 2. Rename the file to `.eslintrc.js`
// 3. Add the rules you want to enforce to the `modules.export` definition. For example:
//     ```jsx
//     module.exports = {
//       rules: {
//         ...RULES_AND_OVERRIDES['no-explicit-any'].rules,
//         ...RULES_AND_OVERRIDES['no-magic-numbers'].rules,
//       },
//       overrides: [],
//     };
//     ```
// 4. Add the rules’ overrides folders to the overrides array. We provide a standard set of
// file overrides that you can extend. For example:
//     ```jsx
//     module.exports = {
//       rules: {
//         ...RULES_AND_OVERRIDES['no-explicit-any'].rules,
//         ...RULES_AND_OVERRIDES['no-magic-numbers'].rules,
//       },
//       overrides: [
//         ...RULES_AND_OVERRIDES['no-explicit-any'].overrides,
//         ...RULES_AND_OVERRIDES['no-magic-numbers'].overrides,
//     		'**/<AnotherNamePattern>.ts'
//       ],
//     };
//     ```
// 5. Test your changes by adding some changes in the folder files that would trigger an error
// in your newly created rules and running `pnpm check:lint`. These errors should also be visible in your IDE.
// 6. Your team could also decide to apply the chosen rules as warnings or modify their options. For that, you would copy/paste the rules and change the result. For example:
//     ```jsx
//     module.exports = {
//       rules: {
//         '@typescript-eslint/consistent-type-assertions': [
//             'warn',
//             { assertionStyle: 'never' },
//           ],
//       },
//       overrides: [],
//     };
//     ```

const RULES_AND_OVERRIDES = {
    "type-assertions": {
        rules: {
            "@typescript-eslint/consistent-type-assertions": [
                "error",
                { assertionStyle: "never" },
            ],
        },
        overrides: [
            {
                files: TEST_FILES,
                rules: {
                    "@typescript-eslint/consistent-type-assertions": [
                        "error",
                        { assertionStyle: "as" },
                    ],
                },
            },
        ],
    },
    "no-explicit-any": {
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
        },
        overrides: [],
    },
    "no-magic-numbers": {
        rules: {
            "no-magic-numbers": "off",
            "@typescript-eslint/no-magic-numbers": [
                "error",
                {
                    ignoreArrayIndexes: true,
                    ignoreEnums: true,
                    ignoreTypeIndexes: true,
                    ignoreNumericLiteralTypes: true,
                    ignoreDefaultValues: true,
                    ignore: [-1, 0, 1, 2, 3, 100, 255],
                    enforceConst: true,
                },
            ],
        },
        overrides: [
            {
                files: [...STYLE_FILES, ...CONSTANTS_FILES],
                rules: {
                    "@typescript-eslint/no-magic-numbers": "off",
                },
            },
            {
                files: TEST_FILES,
                rules: {
                    "@typescript-eslint/no-magic-numbers": "off",
                },
            },
            {
                files: STORY_FILES,
                rules: {
                    "@typescript-eslint/consistent-type-assertions": [
                        "error",
                        { assertionStyle: "as" },
                    ],
                    "@typescript-eslint/no-magic-numbers": "off",
                },
            },
        ],
    },
    "hooks-exhaustive-deps": {
        rules: {
            "react-hooks/exhaustive-deps": "warn",
            curly: ["warn", "multi-line"],
        },
        overrides: [
            {
                files: STORY_FILES,
                rules: {
                    "react-hooks/exhaustive-deps": "off",
                },
            },
        ],
    },
    "prefer-user-event": {
        rules: {},
        overrides: [
            {
                files: UNIT_TEST_FILES,
                rules: {
                    "testing-library/prefer-user-event": "error",
                },
            },
        ],
    },
    "no-container": {
        rules: {},
        overrides: [
            {
                files: UNIT_TEST_FILES,
                rules: {
                    "testing-library/no-container": "error",
                },
            },
        ],
    },
    "redux-selectors": {
        rules: {
            "react-redux/useSelector-prefer-selectors": [
                "error",
                {
                    matching: "^select.*",
                    hook: "useAppSelector",
                },
            ],
        },
        overrides: [
            {
                files: TEST_FILES,
                rules: {
                    "react-redux/useSelector-prefer-selectors": "off",
                },
            },
        ],
    },
    "no-nested-ternary": {
        rules: {
            "no-nested-ternary": "off",
            "unicorn/no-nested-ternary": "error",
        },
        overrides: [],
    },
};

module.exports = {
    rules: {
        ...RULES_AND_OVERRIDES["type-assertions"].rules,
        ...RULES_AND_OVERRIDES["no-explicit-any"].rules,
        ...RULES_AND_OVERRIDES["no-magic-numbers"].rules,
        ...RULES_AND_OVERRIDES["hooks-exhaustive-deps"].rules,
        ...RULES_AND_OVERRIDES["prefer-user-event"].rules,
        ...RULES_AND_OVERRIDES["no-container"].rules,
        ...RULES_AND_OVERRIDES["redux-selectors"].rules,
        ...RULES_AND_OVERRIDES["no-nested-ternary"].rules,
    },
    overrides: [
        ...RULES_AND_OVERRIDES["type-assertions"].overrides,
        ...RULES_AND_OVERRIDES["no-explicit-any"].overrides,
        ...RULES_AND_OVERRIDES["no-magic-numbers"].overrides,
        ...RULES_AND_OVERRIDES["hooks-exhaustive-deps"].overrides,
        ...RULES_AND_OVERRIDES["prefer-user-event"].overrides,
        ...RULES_AND_OVERRIDES["no-container"].overrides,
        ...RULES_AND_OVERRIDES["redux-selectors"].overrides,
        ...RULES_AND_OVERRIDES["no-nested-ternary"].overrides,
    ],
};
