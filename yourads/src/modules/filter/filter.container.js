import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import * as StateActions from '../newsjob/public-newsjob.state';
import FilterView from './filter.view';

export default connect(
  state => ({
    filters: state.getIn(['publicNewsJob', 'filters']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      actions: bindActionCreators(StateActions, dispatch)
    };
  }
)(FilterView);
