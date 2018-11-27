import React from "react";
import { Box, Flex } from "grid-styled";
import colors from "metabase/lib/colors";

import QuestionAndResultLoader from "metabase/containers/QuestionAndResultLoader";
import Visualization from "metabase/visualizations/components/Visualization";

import Button from "metabase/components/Button";
import Card from "metabase/components/Card";
import Icon, { IconWrapper } from "metabase/components/Icon";

const Section = ({ children }) => (
  <Box
    py={4}
    px={4}
    style={{ borderBottom: `2px solid rgba(215, 219, 222, 0.38)` }}
  >
    {children}
  </Box>
);

const Filters = () => (
  <Box>
    <Flex align="center" color={colors["accent2"]}>
      <Icon name="filter" size={22} mr={1} />
      <h3>Filters</h3>
    </Flex>
    <Flex mt={1} align="center" bg="#EDE6F3" style={{ borderRadius: 6 }} p={2}>
      <Box
        bg={colors["accent2"]}
        color="white"
        p={1}
        style={{ borderRadius: 6 }}
      >
        Filter example
      </Box>
    </Flex>
  </Box>
);

const RoundedButton = ({ children }) => (
  <Box
    className="bordered cursor-pointer"
    style={{ borderRadius: 99 }}
    px={2}
    py={1}
  >
    {children}
  </Box>
);

const PreviewTable = () => (
  <Card style={{ minHeight: 120 }} p={5}>
    <RoundedButton>Preview</RoundedButton>
  </Card>
);

const NextSteps = () => (
  <Flex align="center">
    <RoundedButton>Summarize?</RoundedButton>
  </Flex>
);

const Preview = () => (
  <Box bg={colors["bg-light"]}>
    <Section>
      <Flex align="center">
        <Icon name="eye" mr={1} />
        <h3>Preview</h3>
      </Flex>
      <Box className="inline-block" my={1}>
        <PreviewTable />
      </Box>
      <Box my={2}>
        <NextSteps />
      </Box>
    </Section>
  </Box>
);

const CollapsedFields = () => (
  <Flex align="center">
    <Icon name="chevronright" />
  </Flex>
);

const Data = () => (
  <Box>
    <Flex align="center" color={colors["brand"]}>
      <Icon name="table" mr={1} />
      <h3>Data</h3>
    </Flex>
  </Box>
);
class ResultPanel extends React.Component {
  render() {
    return (
      <Box className="bg-white scroll-y full-height">
        <Section>
          <Data />
        </Section>
        <Section>
          <Filters />
          <Box my={2} color={colors["accent2"]}>
            <CollapsedFields />
          </Box>
        </Section>
        <Preview />
        <Flex p={3}>
          <Button primary large onClick={() => this.props.onView()} ml="auto">
            View it
          </Button>
        </Flex>
      </Box>
    );
  }
}

export default ResultPanel;
