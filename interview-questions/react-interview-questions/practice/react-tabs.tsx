import type { FC, ReactNode } from "react";
import { Children, isValidElement, useState } from "react";

// Tabs
// Controls Panel + Containers
// Assummptions
// - this is a component to be reused, part of a Design System
// - we don't want couple it with any async operation (API requests or URL changes)
//
// State
// - Controls Panel
//   - activeIdx
//   - onTabClick
// - Containers
//   - isActive
//
// General UI States
// - Containers could have a loading state
// - Inactive tabs would be rendered but non-visible (a11y, SEO consideration) - TORESEARCH
// - What would happen if we have too many tabs?
//   - ... menu / scrollable
// - a11y is really important, and having a good markup will make a difference on how this could work. Using web standards as much as possible.
//
// Architecture
// Composed components
// More or less granularity

// Option 1:
// PRO: More straightforward implementation
// CONS: More convoluted usage
// <Tabs>
//  <TabControlPanel>
//      <TabButton></TabButton>
//      <TabButton></TabButton>
//      <TabButton></TabButton>
//  </TabControlPanel>
//  <TabWrapper>
//      <TabContainer></TabContainer>
//      <TabContainer></TabContainer>
//      <TabContainer></TabContainer>
//  </TabWrapper>
// </Tabs>

// Option 2:
// PROS: More straightforward usage
// CONS: Would need to use Children to render, so it is more complex
// <Tabs>
//     <Tab title="Title of Tab 1" onTabClick={() => {}} tabId="title-1">
//         <div>Tab 1 Content</div>
//     </Tab>
//     <Tab title="Title of Tab 2" onTabClick={() => {}} tabId="title-2">
//         <div>Tab 2 Content</div>
//     </Tab>
// </Tabs>

// Option 3:
// PROS: More straightforward usage; no Children
// CONS: More complex than option 1
// <Tabs content={[
//     {title: "Title of Tab 1", id: 'title-1', children: (<div>Tab 1 Content</div>), onTabClick: () => {}},
//     {title: "Title of Tab 2", id: 'title-2', children: (<div>Tab 2 Content</div>), onTabClick: () => {}},
//     ]} />

type TabProps = {
    title: string;
    tabId: string;
    children: ReactNode;
    onTabClick?: (tabId: string, title: string) => void;
};

export const Tab: FC<TabProps> = () => {
    return null;
};

type TabButtonProps = {
    title: string;
    tabId: string;

    isActive?: boolean;
    children?: ReactNode;
    onTabClick?: (tabId: string, title: string) => void;
    activeTabId?: string;
};

export const TabButton: FC<TabButtonProps> = ({
    title,
    tabId,
    isActive,
    onTabClick,
}) => {
    const handleTabClick = () => {
        onTabClick?.(tabId, title);
    };

    return (
        <button
            role="tab"
            type="button"
            id={tabId}
            aria-selected={isActive}
            aria-controls={tabId ? `panel-${tabId}` : undefined}
            onClick={handleTabClick}
            className={isActive ? "is-active" : ""}
        >
            {title}
        </button>
    );
};

type TabPanel = {
    children: ReactNode;
    tabId: string;
    isActive: boolean;
};

const TabPanel: FC<TabPanel> = ({ children, isActive, tabId }) => {
    return (
        <div
            role="tabpanel"
            id={`panel-${tabId}`}
            aria-labelledby="tabId"
            hidden={!isActive}
        >
            {children}
        </div>
    );
};

type TabsProps = {
    children: ReactNode[];
};
export const Tabs: FC<TabsProps> = ({ children }) => {
    const childrenArray = Children.toArray(children);
    const [activeTab, setActiveTab] = useState<string>(
        childrenArray[0].props.tabId
    );

    const handleTabClick = (tabId: string, title: string) => {
        console.log("title", title);
        if (tabId !== activeTab) {
            setActiveTab(tabId);
        }
    };

    return (
        <div data-testid="@ds/tabs/wrapper">
            <ul data-testid="@ds/tabs/control-panel">
                {Children.map(children, (child) => {
                    if (isValidElement(child) && child.props) {
                        const { tabId, title } = child.props;

                        return (
                            <li>
                                <TabButton
                                    tabId={tabId}
                                    title={title}
                                    isActive={tabId === activeTab}
                                    onTabClick={handleTabClick}
                                />
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <div data-testid="@ds/tabs/containers">
                {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return (
                            <TabPanel
                                tabId={child?.props?.tabId}
                                isActive={child?.props?.tabId === activeTab}
                            >
                                {child?.props?.children}
                            </TabPanel>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

// Usage:
//    <Tabs>
//      <Tab title="Title of Tab 1" onTabClick={() => {}} tabId="title-1">
//        <div>Tab 1 Content</div>
//      </Tab>
//      <Tab title="Title of Tab 2" onTabClick={() => {}} tabId="title-2">
//        <div>Tab 2 Content</div>
//      </Tab>
//    </Tabs>

// Benefits:
// Single Tab component, making it easy to use
// No context reliance, so it is more simple
// Good a11y
// Callbacks for tab changes

// Drawbacks:
// Every time we switch tabs, we destroy the content of the panes, losing any state
// We would also do many re-renders
// No dynamic adding/removing of tabs

// To improve
// Vertical layout
// Handling overflow of tabs
// Dynamic tabs
