import React from "react";
import { Box } from "grid-styled";

import AdminChecklist from "metabase/entities/admin-checklist";

import Subhead from "metabase/components/type/Subhead";

@AdminChecklist.loadList()
class ChecklistApp extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <Box w={"80%"} ml="auto" mr="auto">
        <Subhead>Setting up</Subhead>
        {list.map(l => (
          <div>
            <Subhead>{l.name}</Subhead>
            <Box>
              {l.tasks.map(t => (
                <Box>
                  <div>{t.title}</div>
                  <p>{t.description}</p>
                </Box>
              ))}
            </Box>
          </div>
        ))}
      </Box>
    );
  }
}

export default ChecklistApp;
