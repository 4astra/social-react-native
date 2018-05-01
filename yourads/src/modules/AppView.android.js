import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, StatusBar, ActivityIndicator, BackHandler } from 'react-native';
import NavigatorViewContainer from './navigator/navigator.container';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/session.state';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

import { NavigationActions } from 'react-navigation';

StatusBar.setHidden(true);

class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  navigateBack() {
    const navigatorState = store.getState().get('navigatorState');

    const currentStackScreen = navigatorState.get('index');
    const currentTab = navigatorState.getIn(['routes', 0, 'index']);

    if (currentTab !== 0 || currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  componentDidMount() {
    snapshotUtil.clearSnapshot()
      .then(snapshot => {
        const { dispatch } = this.props;

        // if (snapshot) {
        //   dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        // } else {
        //   dispatch(SessionStateActions.initializeSessionState());
        // }

        // store.subscribe(() => {
        //   snapshotUtil.saveSnapshot(store.getState());
        // });
        dispatch(SessionStateActions.initializeSessionState());
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#455a64' barStyle='light-content' />
        <NavigatorViewContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
