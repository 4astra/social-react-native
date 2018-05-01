import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../buy-video/buy-video.state';
import CreatedBuyVideoView from './created.buy-video.view';

export default connect(
  state => ({
    lstCreatedBuyVideo: state.getIn(['buyVideo', 'lstCreatedBuyVideo']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(CreatedBuyVideoView);
