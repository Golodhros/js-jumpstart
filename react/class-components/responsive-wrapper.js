import React, { Component } from "react";

// Responsive chart wrapper
// From https://medium.com/@caspg/responsive-chart-with-react-and-d3v4-afd717e57583

export default WrappedComponent =>
    class ResponsiveComponent extends Component {
        state = {
            containerWidth: null
        };

        componentDidMount() {
            this.fitParentContainer();
            window.addEventListener("resize", this.fitParentContainer);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.fitParentContainer);
        }

        fitParentContainer = () => {
            const { containerWidth } = this.state;
            const currentContainerWidth = this.componentContainer.getBoundingClientRect()
                .width;
            const shouldResize = containerWidth !== currentContainerWidth;

            if (shouldResize) {
                this.setState({
                    containerWidth: currentContainerWidth
                });
            }
        };

        renderChart() {
            const parentWidth = this.props.width || this.state.containerWidth;

            return <WrappedComponent {...this.props} width={parentWidth} />;
        }

        render() {
            const { containerWidth } = this.state;
            const shouldRenderChart = containerWidth !== null;

            return (
                <div
                    ref={el => {
                        this.componentContainer = el;
                    }}
                    className="Responsive-wrapper"
                >
                    {shouldRenderChart && this.renderChart()}
                </div>
            );
        }
    };
