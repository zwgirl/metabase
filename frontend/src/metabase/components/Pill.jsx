import React from "react";
import styled from "styled-components";
import { Absolute } from "metabase/components/Position";
import { background, color, display, space } from "styled-system";
import { alpha, color as metabaseColor } from "metabase/lib/colors";

const DEFAULT_PILL_COLOR = metabaseColor("brand");

export const Pill = styled.div`
  ${space};
  ${background};
  ${display};
  color: ${props => (props.active ? "white" : DEFAULT_PILL_COLOR)};
  width: 100%;
  border-radius: 99px;
  font-weight: bold;
  background-color: ${props =>
    props.active ? metabaseColor("brand") : alpha(metabaseColor("brand"), 0.2)};
  z-index: 2;
  &:hover {
    cursor: pointer;
    background-color: ${props =>
      props.active
        ? alpha(DEFAULT_PILL_COLOR, 0.8)
        : alpha(DEFAULT_PILL_COLOR, 0.35)};
    color: ${props => (props.active ? "white" : DEFAULT_PILL_COLOR)};
    transition: background;
  }
`;

Pill.defaultProps = {
  py: "12px",
  pl: "36px",
  pr: "36px",
  display: "block",
};

const PillWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  color: ${props => props.color || DEFAULT_PILL_COLOR};
  &:hover {
    color: ${props => (props.active ? "white" : props.color)};
  }
  .Icon {
    opacity: 0.6;
    transform: translate3d(0, 1px, 0);
  }
`;

export const PillWithAdornment = ({ left, right, ...props }) => {
  return (
    <PillWrapper color={props.color} active={props.active}>
      {left && (
        <Absolute left={0} pl="16px">
          {left}
        </Absolute>
      )}
      <Pill {...props} />
      {right && (
        <Absolute right={0} pr="16px">
          {right}
        </Absolute>
      )}
    </PillWrapper>
  );
};
