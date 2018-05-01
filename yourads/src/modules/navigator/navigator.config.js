import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import { TabBarBottom, TabNavigator, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppConfig from '../../constants/config';

import HomeContainer from '../home/home.container';
import LiveRecordContainer from '../live-record/live-record.container';
import NotificationContainer from '../notification/notification.container';
import ProfileContainer from '../profile/profile.container';
import PublicNewsJobContainer from '../newsjob/public-newsjob.container';
import FilterContainer from '../filter/filter.container';
import AuthContainer from '../auth/auth.container';
import MakeVideoContainer from '../make-video/make-video.container';
import BuyVideoContainer from '../buy-video/buy-video.container';
import NewBuyVideoContainer from '../buy-video/new.buy-video.container';
import CameraBuyVideoContainer from '../buy-video/camera.buy-video.container';
import CameraCaptureBuyVideoContainer from '../buy-video/camera-capture.buy-video.container';

const icons = [
  'ios-home',
  'ios-chatboxes',
  'ios-chatboxes',
  'ios-chatboxes',
  'ios-settings'
];

const navTitles = ['YourAds', 'News Job', 'Live Capture', 'Notification', 'Profile'];

class TabBar extends Component {
  renderItem = (route, index) => {
    const {
      navigation,
      jumpToIndex,
    } = this.props;

    // const isModel = (route.routeName === 'Capture' || route.routeName == 'FilterModal');

    const focused = index === navigation.state.index;
    const color = focused ? AppConfig.tabActiveTintColor : AppConfig.tabInactiveTintColor;
    return (
      <TouchableWithoutFeedback
        key={route.key}
        style={styles.tab}
        onPress={
          () => jumpToIndex(index)
          // isModel ? navigation.navigate('CaptureModal') : jumpToIndex(index)
        }
      >
        <View style={styles.tab}>
          <Ionicons
            name={focused ? icons[index] : icons[index] + '-outline'}
            size={26}
            style={{ color: color }}
          />
          {/* <Text style={{ color, fontSize: 10 }}>{navTitles[index]}</Text> */}
          {/* route.routeName */}
        </View>

      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      navigation,
    } = this.props;

    const {
      routes,
    } = navigation.state;

    return (
      <View style={styles.tabBar}>
        {routes && routes.map(this.renderItem)}
      </View>
    );
  }
}
/*
 * Here we actuall create our TabNavigator. As you can see we're not doing anything fancy.
 * To prevent an error I've simple passed a View to the Capture tab - this won't actually be seen
 * so make it as "cheap" as possible
 */

const Tabs = TabNavigator({
  Home: {
    screen: HomeContainer,
  },
  NewsJob: {
    screen: PublicNewsJobContainer,
  },
  Capture: {
    screen: LiveRecordContainer,
  },
  Activity: {
    screen: NotificationContainer,
  },
  Profile: {
    screen: ProfileContainer,
  }
}, {
    tabBarPosition: 'bottom',
    tabBarComponent: TabBar
  });

/*
 * We need a root stack navigator with the mode set to modal so that we can open the capture screen
 * as a modal. Defaults to the Tabs navigator.
 */
const AppNavigator = StackNavigator({

  Auth: {
    screen: AuthContainer
  },
  Tabs: {
    screen: Tabs,
  },
  CaptureModal: {
    screen: LiveRecordContainer,
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
  FilterModal: {
    screen: FilterContainer
  },
  MakeVideo: {
    screen: MakeVideoContainer
  },
  BuyVideo: {
    screen: BuyVideoContainer
  },
  NewBuyVideo: {
    screen: NewBuyVideoContainer
  },
  CameraBuyVideo: {
    screen: CameraBuyVideoContainer
  },
  CameraCaptureBuyVideo: {
    screen: CameraCaptureBuyVideoContainer
  }
}, {
    //headerMode: 'none',
    mode: 'push',//'modal',
  });

export default AppNavigator;


const styles = StyleSheet.create({
  tabBar: {
    height: 49,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: '#F7F7F7',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 9
  },
});