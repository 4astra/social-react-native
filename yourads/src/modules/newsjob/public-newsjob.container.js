import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import PublicNewsJobView from './public-newsjob.view';
import * as PublicNewsJobStateAction from './public-newsjob.state';

export default connect(
  state => ({
    loading: state.getIn(['publicNewsJob', 'loading']),
    list: state.getIn(['publicNewsJob', 'list']),
    isFilter: state.getIn(['publicNewsJob', 'isFilter']),
    filterResult: state.getIn(['publicNewsJob', 'filterResult']),
    keyword: state.getIn(['publicNewsJob', 'keyword']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      publicNewsJobStateActions: bindActionCreators(PublicNewsJobStateAction, dispatch)
    };
  }
)(PublicNewsJobView);
