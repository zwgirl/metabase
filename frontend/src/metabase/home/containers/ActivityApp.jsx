import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { t } from "ttag";

import Modal from "metabase/components/Modal";
import Subhead from "metabase/components/Subhead";

import Activity from "../components/Activity";
import NewUserOnboardingModal from "../components/NewUserOnboardingModal";

import * as homepageActions from "../actions";
import { getActivity, getRecentViews, getUser } from "../selectors";

import { Box } from "grid-styled";

const mapStateToProps = (state, props) => ({
  activity: getActivity(state),
  recentViews: getRecentViews(state),
  user: getUser(state),
  showOnboarding: "new" in props.location.query,
});

const mapDispatchToProps = {
  ...homepageActions,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class HomepageApp extends Component {
  static propTypes = {
    showOnboarding: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    // TODO - these should be used by their call sites rather than passed
    activity: PropTypes.array,
    fetchActivity: PropTypes.func.isRequired,

    recentViews: PropTypes.array,
    fetchRecentViews: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      onboarding: props.showOnboarding,
    };
  }

  completeOnboarding() {
    this.setState({ onboarding: false });
  }

  render() {
    const { user } = this.props;

    return (
      <Box mx={4}>
        {this.state.onboarding ? (
          <Modal>
            <NewUserOnboardingModal
              user={user}
              onClose={() => this.completeOnboarding()}
            />
          </Modal>
        ) : null}
        <Box py={3}>
          <Subhead>{t`Activity`}</Subhead>
        </Box>
        <Box w={2 / 3} ml="auto" mr="auto">
          <Activity {...this.props} />
        </Box>
      </Box>
    );
  }
}
