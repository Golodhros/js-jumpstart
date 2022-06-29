// Simple mocking of functions within a library

// Next Router
jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

// Custom Hook
jest.mock("hooks/useDataSources", () => ({
    useDataSources: () => ({
        data: { verityDataSourceSummaries: [] },
        loading: false,
    }),
}));

jest.mock('@lyft/service-plugin-tracker', () => ({
    ClickTracker: ({ children }: any) => children,
    Track: { send: jest.fn() },
}));

// Later...
const actual = (Track.send as jest.Mock).mock.calls[0][0];


// Variable implementation by tests
jest.mock("next/router");

beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: {
            id: 'testID',
        },
        asPath: '',
    }));
});

// Mocking part of a module
jest.mock('utils', () => {
    const originalUtils = jest.requireActual('utils');

    return {
        __esModule: true,
        ...originalUtils,
        updateRouterQueryWith: jest.fn(),
    };
});
