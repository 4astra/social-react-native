import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../buy-video/buy-video.state';
import NewBuyVideoView from './new.buy-video.view';

export default connect(
  state => ({
    lstDoingBuyVideo: state.getIn(['buyVideo', 'lstDoingBuyVideo']),
    commonCodes: state.getIn(['buyVideo', 'commonCodes']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(NewBuyVideoView);
