import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../buy-video/buy-video.state';
import DoingBuyVideoView from './doing.buy-video.view';

export default connect(
  state => ({
    lstDoingBuyVideo: state.getIn(['buyVideo', 'lstDoingBuyVideo']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(DoingBuyVideoView);
