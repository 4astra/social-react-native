import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../make-video/make-video.state';
import ContributedProjectMakeVideoView from './contributed.make-video.view';

export default connect(
  state => ({
    lstContributedProject: state.getIn(['makeVideo', 'lstContributedProject']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(ContributedProjectMakeVideoView);
