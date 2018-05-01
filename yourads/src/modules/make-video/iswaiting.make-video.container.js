import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../make-video/make-video.state';
import IsWaitingMakeVideoView from './iswaiting.make-video.view';

export default connect(
  state => ({
    isSpecifyBidder: state.getIn(['makeVideo', 'isSpecifyBidder']),
    lstPublicBidder: state.getIn(['makeVideo', 'lstPublicBidder']),
    lstSpecifyBidder: state.getIn(['makeVideo', 'lstSpecifyBidder'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(IsWaitingMakeVideoView);
