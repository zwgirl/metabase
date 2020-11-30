import React from "react";
import { Box, Flex } from "grid-styled";
import CandidateListLoader from "metabase/containers/CandidateListLoader";

import ExplorePane from "metabase/components/ExplorePane";
import Heading from "metabase/components/type/Heading";
import Subhead from "metabase/components/type/Subhead";
import Text from "metabase/components/type/Text";
import Icon from "metabase/components/Icon";
import Link from "metabase/components/Link";
import { color } from "metabase/lib/colors";
import { t, jt } from "ttag";
import Tooltip from "metabase/components/Tooltip";
import { Grid, GridItem } from "metabase/components/Grid";

import Database from "metabase/entities/databases";
const GuideApp = () => (
  <Box w={"80%"} ml="auto" mr="auto" pt={1}>
    <Flex py={2} align="center">
      <Heading>Getting started</Heading>
      <Link ml="auto">Edit</Link>
    </Flex>

    <Box>
      <Subhead>Quick start X-rays</Subhead>
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
      <Box mt={3}>
        <Database.ListLoader>
          {({ databases }) => {
            if (databases.length === 0) {
              return null;
            }
            return (
              <Box pt={2} className="hover-parent hover--visibility">
                <Subhead>
                  <Flex align="center">{t`Our data`}</Flex>
                </Subhead>
                <Box mb={4}>
                  <Grid>
                    {databases.map(database => (
                      <GridItem w={[1, 1 / 3]} key={database.id}>
                        <Link
                          to={`browse/${database.id}`}
                          hover={{ color: color("brand") }}
                          data-metabase-event={`Homepage;Browse DB Clicked; DB Type ${database.engine}`}
                        >
                          <Box
                            p={3}
                            bg={color("bg-medium")}
                            className="hover-parent hover--visibility"
                          >
                            <Icon
                              name="database"
                              color={color("database")}
                              mb={3}
                              size={28}
                            />
                            <Flex align="center">
                              <h3 className="text-wrap">{database.name}</h3>
                              <Box ml="auto" mr={1} className="hover-child">
                                <Flex align="center">
                                  <Tooltip
                                    tooltip={t`Learn about this database`}
                                  >
                                    <Link
                                      to={`reference/databases/${database.id}`}
                                    >
                                      <Icon
                                        name="reference"
                                        color={color("text-light")}
                                      />
                                    </Link>
                                  </Tooltip>
                                </Flex>
                              </Box>
                            </Flex>
                          </Box>
                        </Link>
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              </Box>
            );
          }}
        </Database.ListLoader>
      </Box>
    </Box>
  </Box>
);

export default GuideApp;
