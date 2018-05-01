import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import AuthView from './auth.view';
import * as StateActions from './auth.state';

export default connect(
   state => ({
    isLoggedIn: state.getIn(['authState', 'isLoggedIn'])
   }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       authAction: bindActionCreators(StateActions, dispatch)
     };
   }
)(AuthView);
