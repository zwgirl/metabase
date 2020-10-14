import React from "react";
import { t } from "ttag";
import { Motion, spring } from "react-motion";

import Button from "metabase/components/Button";

const SPRING_CONFIG = { stiffness: 200, damping: 26 };

const WIDTH = 384;

function Sidebar({ onClose, onCancel, closeIsDisabled, children }) {
  return (
    <Motion
      defaultStyle={{ opacity: 0, width: 0 }}
      style={
        // isOpen
        //   ?
        { opacity: spring(1), width: spring(WIDTH, SPRING_CONFIG) }
        // : { opacity: spring(0), width: spring(0, SPRING_CONFIG) }
      }
    >
      {motionStyle => (
        <div
          style={motionStyle}
          className="flex flex-column border-left bg-white"
        >
          <div className="flex flex-column flex-auto overflow-y-scroll">
            {children}
          </div>
          {(onClose || onCancel) && (
            <div
              className="flex align-center border-top"
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                paddingRight: 32,
                paddingLeft: 32,
              }}
            >
              {onCancel && (
                <Button small borderless onClick={onCancel}>{t`Cancel`}</Button>
              )}
              {onClose && (
                <Button
                  primary
                  small
                  className="ml-auto"
                  onClick={onClose}
                  disabled={closeIsDisabled}
                >{t`Done`}</Button>
              )}
            </div>
          )}
        </div>
      )}
    </Motion>
  );
}

export default Sidebar;
