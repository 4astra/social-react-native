import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import MakeVideoView from './make-video.view';

export default connect(
  // state => ({
  //   lstPublicBidder: state.getIn(['makeVideo', 'lstPublicBidder']),
  //   lstSpecifyingBidder: state.getIn(['makeVideo', 'lstSpecifyingBidder'])
  // }),
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(MakeVideoView);
