import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CameraCaptureBuyVideoView from './camera-capture.buy-video.view';
import * as CameraActions from './buy-video.state';

export default connect(
  state => ({
    lstCamera360: state.getIn(['buyVideo', 'lstCamera360']),
    isCaptureContinue: state.getIn(['buyVideo', 'isCaptureContinue']),
    numCaptureCurrentCamera: state.getIn(['buyVideo', 'numCaptureCurrentCamera']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(CameraActions, dispatch)
    };
  }
)(CameraCaptureBuyVideoView);
