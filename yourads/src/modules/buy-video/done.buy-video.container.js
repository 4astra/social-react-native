import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../buy-video/buy-video.state';
import DoneBuyVideoView from './done.buy-video.view';

export default connect(
  state => ({
    lstDoneBuyVideo: state.getIn(['buyVideo', 'lstDoneBuyVideo']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(DoneBuyVideoView);
