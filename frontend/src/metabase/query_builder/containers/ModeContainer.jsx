import React from "react";
import { Box, Flex } from "grid-styled";
import { Motion, spring } from "react-motion";
import cx from "classnames";
import { findDOMNode } from "react-dom";

import fitViewport from "metabase/hoc/FitViewPort";
import QuestionAndResultLoader from "metabase/containers/QuestionAndResultLoader";
import Visualization from "metabase/visualizations/components/Visualization";

import { Absolute } from "metabase/components/Position";
import Button from "metabase/components/Button";
import Card from "metabase/components/Card";
import Icon, { IconWrapper } from "metabase/components/Icon";

import colors from "metabase/lib/colors";

/* Panels */
import ReferencePanel from "metabase/query_builder/containers/ReferencePanel";
import VisualizationPanel, {
  VisualiztionControls,
} from "metabase/query_builder/containers/VisualizationPanel";
import ResultPanel from "metabase/query_builder/containers/ResultPanel";

@fitViewport
class ModeContainer extends React.Component {
  state = {
    vizPanelOpen: false,
    referencePanelOpen: false,
    showResultPane: true,
  };
  render() {
    const { referencePanelOpen, vizPanelOpen, showResultPane } = this.state;
    const wrapperHeight =
      findDOMNode(this.container) && findDOMNode(this.container).offsetHeight;
    return (
      <Flex
        flexDirection="column"
        w={"100%"}
        className={cx(this.props.fitClassNames, "overflow-hidden")}
      >
        <QuestionAndResultLoader questionId={this.props.params.q1}>
          {({ question, result, cancel, reload, rawSeries, loading }) => {
            if (!question) {
              return <div>"Loading..."</div>;
            }
            return (
              <Box className="flex flex-column flex-full">
                <Flex
                  align="center"
                  p={[2, 3]}
                  px={3}
                  className="border-bottom bg-white relative"
                >
                  <h2>{question.displayName()}</h2>
                  <Absolute bottom={0} left={0} right={0} className="flex">
                    <Box
                      ml="auto"
                      mr="auto"
                      className="bordered shadowed cursor-pointer z6 relative bg-white"
                      style={{ bottom: -16, borderRadius: 99 }}
                      px={2}
                      py={1}
                      onClick={() =>
                        this.setState({
                          showResultPane: !this.state.showResultPane,
                        })
                      }
                    >
                      {this.state.showResultPane ? (
                        <Icon name="chevrondown" />
                      ) : (
                        <Flex align="center">
                          <Box mx={1} color={colors["brand"]}>
                            Table
                          </Box>
                          <Box mx={1} color={colors["accent1"]}>
                            Agg
                          </Box>
                          <Box mx={1} color={colors["accent2"]}>
                            <Icon name="filter" size={20} />
                          </Box>
                        </Flex>
                      )}
                    </Box>
                  </Absolute>
                </Flex>
                <Box
                  className="flex-full relative"
                  ref={node => (this.container = node)}
                >
                  <Motion
                    defaultStyle={{ x: 0, y: 0, opacity: 0 }}
                    style={{
                      x: vizPanelOpen ? spring(40) : spring(0),
                      y: spring(10),
                      opacity: vizPanelOpen ? spring(1) : spring(0),
                    }}
                  >
                    {({ x, y, opacity }) => (
                      <Absolute
                        top={20}
                        bottom={80}
                        style={{
                          opacity,
                          zIndex: 2,
                          transform: `translate3d(${x}px, 0px, 0px)`,
                        }}
                      >
                        <VisualizationPanel
                          question={question}
                          onClosePanel={() =>
                            this.setState({ vizPanelOpen: false })
                          }
                        />
                      </Absolute>
                    )}
                  </Motion>
                  <Motion
                    defaultStyle={{ x: 0, y: 0, opacity: 0 }}
                    style={{
                      x: referencePanelOpen ? spring(40) : spring(0),
                      y: spring(10),
                      opacity: referencePanelOpen ? spring(1) : spring(0),
                    }}
                  >
                    {({ x, y, opacity }) => (
                      <Absolute
                        right={0}
                        style={{
                          transform: `translate3d(-${x}px, ${y}px, 0px)`,
                          opacity,
                          zIndex: 4,
                        }}
                      >
                        <ReferencePanel
                          question={question}
                          open={referencePanelOpen}
                        />
                      </Absolute>
                    )}
                  </Motion>
                  <Motion
                    defaultStyle={{ left: 80, right: 0 }}
                    style={{
                      left: vizPanelOpen ? spring(400) : spring(60),
                      right: referencePanelOpen ? spring(360) : spring(0),
                    }}
                  >
                    {({ left, right }) => (
                      <Box style={{ height: "80vh" }} mr={right} ml={left}>
                        {rawSeries && <Visualization rawSeries={rawSeries} />}
                      </Box>
                    )}
                  </Motion>
                  <Absolute
                    top={0}
                    bottom={40}
                    style={{ display: "flex", zIndex: 3 }}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      flexDirection="column"
                      px={1}
                    >
                      <VisualiztionControls
                        question={question}
                        isOpen={vizPanelOpen}
                        onOpenPanel={() =>
                          this.setState({
                            vizPanelOpen: !this.state.vizPanelOpen,
                          })
                        }
                      />
                    </Flex>
                  </Absolute>
                  <Motion
                    defaultStyle={{ y: wrapperHeight - 60 }}
                    style={{
                      y: showResultPane
                        ? spring(0)
                        : spring(wrapperHeight - 60),
                    }}
                  >
                    {({ y }) => (
                      <Absolute
                        bottom={0}
                        left={0}
                        right={0}
                        top={0}
                        style={{
                          zIndex: 3,
                          backgroundColor: "white",
                          transform: `translate3d(0px, ${y}px, 0px)`,
                        }}
                      >
                        <ResultPanel
                          onView={() =>
                            this.setState({ showResultPane: false })
                          }
                          dataId={this.props.params.q2}
                          aggregationId={this.props.params.q3}
                        />
                      </Absolute>
                    )}
                  </Motion>
                </Box>
              </Box>
            );
          }}
        </QuestionAndResultLoader>
      </Flex>
    );
  }
}

export default ModeContainer;
