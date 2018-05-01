import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../make-video/make-video.state';
import JoinedProjectMakeVideoView from './jointed.make-video.view';

export default connect(
  state => ({
    lstJointedProject: state.getIn(['makeVideo', 'lstJointedProject']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(JoinedProjectMakeVideoView);
