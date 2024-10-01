import { type FC, type ReactNode, useEffect } from "react";
import { type StoryFn } from "@storybook/react";
import { styled } from "styled-components";

import { MockedProvider } from "@apollo/client/testing";
import type { MockedProviderProps } from "@apollo/client/testing/react/MockedProvider";

import { apolloClient } from "#/utils/gql/apolloClient";

const SMALL_WRAPPER_WIDTH = 330;
const REGULAR_WRAPPER_WIDTH = 500;
const WIDE_WRAPPER_WIDTH = 992;

const StoryWrapper = styled.div`
    width: ${REGULAR_WRAPPER_WIDTH}px;
    display: flex;
    justify-content: end;
`;
export const withWrapper = (Story: StoryFn) => {
    return (
        <StoryWrapper>
            <Story />
        </StoryWrapper>
    );
};

const StoryWideWrapper = styled.div`
    max-width: ${WIDE_WRAPPER_WIDTH}px;
`;
export const withWideWrapper = (Story: StoryFn) => {
    return (
        <StoryWideWrapper>
            <Story />
        </StoryWideWrapper>
    );
};

const StoryCenteredWrapper = styled.div`
    width: ${SMALL_WRAPPER_WIDTH}px;
    display: flex;
    margin: auto;
    display: flex;
    align-items: center;
    min-height: 100vh;
`;
export const withCenteredWrapper = (Story: StoryFn) => {
    return (
        <StoryCenteredWrapper>
            <Story />
        </StoryCenteredWrapper>
    );
};

export const withFullHeightRoot = (Story: StoryFn) => {
    // This is a workaround to add a class to the root element of the storybook
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.querySelector("#storybook-root")?.classList.add("h-full");
    }, []);

    return (
        <>
            <Story />
        </>
    );
};

export const withGreyBackground = (Story: StoryFn) => {
    return (
        <div className="bg-neutral-100 h-full">
            <Story />
        </div>
    );
};

const StoryBorderWrapper = styled.div`
    border-radius: ${themeSpace(1)};
    border: 1px solid ${theme.colors.neutral[300]};
`;
export const withBorderWrapper = (Story: StoryFn) => {
    return (
        <StoryBorderWrapper>
            <Story />
        </StoryBorderWrapper>
    );
};

const StoryBoundaryWrapper = styled.div`
    border: 1px red dashed;
    overflow: hidden;
    resize: both;
    width: 300px;
`;
export const withBoundaryWrapper = (Story: StoryFn) => {
    return (
        <StoryBoundaryWrapper>
            <Story />
        </StoryBoundaryWrapper>
    );
};

export const MockProvider: FC<{ children: ReactNode; store: any }> = ({
    children,
    store,
}) => {
    return <Provider store={store}>{children}</Provider>;
};

export const withProvider = (store, Story: StoryFn) => {
    return (
        <MockProvider store={store}>
            <Story />
        </MockProvider>
    );
};

export const withApolloProvider = (Story: StoryFn) => {
    return (
        <ApolloProvider client={apolloClient}>
            <Story />
        </ApolloProvider>
    );
};

export const withMockedApolloProvider = (
    mocks: MockedProviderProps["mocks"],
    Story: StoryFn
) => {
    return (
        <MockedProvider addTypename={false} mocks={mocks}>
            <Story />
        </MockedProvider>
    );
};
