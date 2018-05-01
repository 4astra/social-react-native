import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Dimensions,
} from 'react-native';

import AppConfig from '../../constants/config';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import IsWaitingMakeVideoContainer from './iswaiting.make-video.container';
import JointedProjectMakeVideoContainer from './jointed.make-video.container';
import ContributedProjectMakeVideoContainer from './contributed.make-video.container';

const initialLayout = {
	height: 45,
	width: Dimensions.get('window').width,
};

const FirstRoute = () => <IsWaitingMakeVideoContainer />;
const SecondRoute = () => <JointedProjectMakeVideoContainer />;
const ThreeRoute = () => <ContributedProjectMakeVideoContainer />;

/**
 * @author Hoat Ha
 * @description MakeVideo View
 */
class MakeVideoView extends Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'Đang chờ' },
			{ key: 'second', title: 'Đã tham gia' },
			{ key: 'three', title: 'Đã hợp tác' },
		],
	};
	static navigationOptions = {
		title: 'Làm Video / Dự án của tôi',
		headerTintColor: AppConfig.headerTintColor,
		headerStyle: {
			backgroundColor: AppConfig.headerStyleColor
		},
	}

	static propTypes = {
		navigate: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	changeTabIndex = index => this.setState({ index });

	drawHeader = props => <TabBar
		{...props}
		scrollEnabled
		indicatorStyle={styles.indicator}
		style={styles.tabbar}
		tabStyle={styles.tab}
		labelStyle={styles.label}
	/>

	drawScence = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
		three: ThreeRoute,
	});

	render() {
		return (
			<TabViewAnimated
				style = {styles.container}
				navigationState={this.state}
				renderScene={this.drawScence}
				renderHeader={this.drawHeader}
				onIndexChange={this.changeTabIndex}
				initialLayout={initialLayout}
			/>
		);
	}
}

export default MakeVideoView;

const styles = StyleSheet.create({
	container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: 'white',
  },
  tab: {
    width: Dimensions.get('window').width / 3.0,
  },
  indicator: {
    backgroundColor: AppConfig.headerStyleColor,
  },
  label: {
    color: 'black',
  },
});