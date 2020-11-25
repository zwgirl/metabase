import React from "react";
import { Box } from "grid-styled";
import CandidateListLoader from "metabase/containers/CandidateListLoader";

import ExplorePane from "metabase/components/ExplorePane";
import Heading from "metabase/components/type/Heading";
import Text from "metabase/components/type/Text";

const ExploreApp = () => (
  <Box w={"80%"} ml="auto" mr="auto">
    <Box mt={2} mb={3}>
      <Heading>Quickstart x-rays</Heading>
      <Text>Some basic analysis to get you started.</Text>
    </Box>
    <CandidateListLoader>
      {({ candidates, sampleCandidates, isSample }) => {
        // if there are no items to show then just hide the section
        if (!candidates && !sampleCandidates) {
          return null;
        }
        return (
          <ExplorePane
            candidates={candidates}
            withMetabot={false}
            title=""
            gridColumns={[1, 1 / 3]}
            asCards={true}
          />
        );
      }}
    </CandidateListLoader>
  </Box>
);

export default ExploreApp;
