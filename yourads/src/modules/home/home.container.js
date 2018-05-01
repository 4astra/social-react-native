import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import HomeView from './home.view';
import * as HomeActions from './home.state';

export default connect(
   state =>({
     topProviders: state.getIn(['homeState', 'topProviders']),
     topContractors: state.getIn(['homeState', 'topContractors']),
     topBuyers: state.getIn(['homeState', 'topBuyers']),
     videosTemplate: state.getIn(['homeState', 'videosTemplate']),
   }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       homeAction: bindActionCreators(HomeActions, dispatch)
     };
   }
)(HomeView);
