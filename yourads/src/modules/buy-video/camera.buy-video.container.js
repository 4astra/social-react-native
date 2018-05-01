import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CameraBuyVideoView from './camera.buy-video.view';
import * as CameraActions from './buy-video.state';

export default connect(
  state => ({
    lstCamera360: state.getIn(['buyVideo', 'lstCamera360'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(CameraActions, dispatch)
    };
  }
)(CameraBuyVideoView);
