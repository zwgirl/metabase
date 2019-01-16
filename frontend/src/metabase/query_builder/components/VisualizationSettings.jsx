import React from "react";
import PropTypes from "prop-types";
import { t } from "c-3po";
import Icon from "metabase/components/Icon.jsx";
import PopoverWithTrigger from "metabase/components/PopoverWithTrigger.jsx";
import Modal from "metabase/components/Modal.jsx";

import ChartSettings from "metabase/visualizations/components/ChartSettings.jsx";

import visualizations, { getVisualizationRaw } from "metabase/visualizations";

import cx from "classnames";

export default class VisualizationSettings extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    question: PropTypes.object.isRequired,
    result: PropTypes.object,
    setDisplayFn: PropTypes.func.isRequired,
    onUpdateVisualizationSettings: PropTypes.func.isRequired,
    onReplaceAllVisualizationSettings: PropTypes.func.isRequired,
  };

  setDisplay = type => {
    // notify our parent about our change
    this.props.setDisplayFn(type);
    this.refs.displayPopover.toggle();
  };

  renderChartTypePicker() {
    let { result, question } = this.props;
    let { CardVisualization } = getVisualizationRaw([
      { card: question.card(), data: result.data },
    ]);

    return <div className="relative" />;
  }

  open = initial => {
    this.props.showChartSettings(initial || {});
  };

  close = () => {
    this.props.showChartSettings(null);
  };

  render() {
    if (this.props.result && this.props.result.error === undefined) {
      const { chartSettings } = this.props.uiControls;
      return (
        <div className="VisualizationSettings">
          <Modal wide tall isOpen={chartSettings} onClose={this.close}>
            <ChartSettings
              question={this.props.question}
              addField={this.props.addField}
              series={[
                {
                  card: this.props.question.card(),
                  data: this.props.result.data,
                },
              ]}
              onChange={this.props.onReplaceAllVisualizationSettings}
              onClose={this.close}
              initial={chartSettings}
            />
          </Modal>
        </div>
      );
    } else {
      return false;
    }
  }
}
