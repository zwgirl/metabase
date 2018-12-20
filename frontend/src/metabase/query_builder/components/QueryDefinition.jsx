import React from "react";
import { Flex } from "grid-styled";

import Icon from "metabase/components/Icon";

const QueryDefinition = ({ question, setMode }) => (
  <Flex align="center">
    {question.query().table() && (
      <span
        className="text-brand bg-light rounded mr1 p1"
        onClick={() => setMode("worksheet")}
      >
        {question.query().table().display_name}
      </span>
    )}
    {question.query().filters().length > 0 && (
      <span className="flex align-center">
        <span className="mx1">•</span>
        {/* todo - this should be changed to use the canonical color names */}
        <span className="text-purple">
          <Icon name="filter" size={20} />
        </span>
      </span>
    )}
    {question.card().display && (
      <span
        onClick={() => setMode("visualize")}
        className="p1 bg-light rounded text-brand flex align-center"
      >
        <Icon name={question.card().display} />
        <span mx={1}>{question.card().display}</span>
      </span>
    )}
  </Flex>
);

export default QueryDefinition;
