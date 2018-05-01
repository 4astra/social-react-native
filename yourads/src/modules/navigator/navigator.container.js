import {connect} from 'react-redux';
import NavigatorView from './navigator.view';

export default connect(
  state => ({
    navigatorState: state.get('navigatorState').toJS()
  })
)(NavigatorView);
