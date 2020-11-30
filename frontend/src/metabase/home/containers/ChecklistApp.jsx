import React from "react";
import { Box, Flex } from "grid-styled";

import { color } from "metabase/lib/colors";

import AdminChecklist from "metabase/entities/admin-checklist";

import Icon from "metabase/components/Icon";
import Link from "metabase/components/Link";
import Subhead from "metabase/components/type/Subhead";
import Heading from "metabase/components/type/Heading";
import Text from "metabase/components/type/Text";

const TaskList = ({ tasks }) => (
  <ol>
    {tasks.map((task, index) => (
      <li className="mb2" key={index}>
        <Task {...task} />
      </li>
    ))}
  </ol>
);

const TaskSectionHeader = ({ name }) => (
  <h4 className="text-medium text-bold text-uppercase pb2">{name}</h4>
);

const TaskSection = ({ name, tasks }) => (
  <div className="mb4">
    <TaskSectionHeader name={name} />
    <TaskList tasks={tasks} />
  </div>
);

const TaskTitle = ({ title, titleClassName }) => (
  <h3 className={titleClassName}>{title}</h3>
);

const TaskDescription = ({ description }) => (
  <p className="m0 mt1">{description}</p>
);

const CompletionBadge = ({ completed }) => (
  <div
    className="mr2 flex align-center justify-center flex-no-shrink"
    style={{
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: completed ? color("success") : color("text-light"),
      backgroundColor: completed ? color("success") : color("text-white"),
      width: 32,
      height: 32,
      borderRadius: 99,
    }}
  >
    {completed && <Icon name="check" color={color("text-white")} />}
  </div>
);

export const Task = ({ title, description, completed, link }) => (
  <Link
    to={link}
    className="bordered border-brand-hover rounded transition-border flex align-center p2 no-decoration"
  >
    <CompletionBadge completed={completed} />
    <div>
      <TaskTitle
        title={title}
        titleClassName={completed ? "text-success" : "text-brand"}
      />
      {!completed ? <TaskDescription description={description} /> : null}
    </div>
  </Link>
);

@AdminChecklist.loadList()
class ChecklistApp extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <Box w={"65%"} ml="auto" mr="auto">
        <Flex py={2} align="center">
          <Heading>Setting up</Heading>
          <Icon name="ellipsis" ml="auto" />
        </Flex>
        <Box mt={2}>
          {list.map((section, index) => (
            <TaskSection {...section} key={index} />
          ))}
        </Box>
      </Box>
    );
  }
}

export default ChecklistApp;
