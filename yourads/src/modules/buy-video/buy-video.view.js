import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Text
} from 'react-native';

import AppConfig from '../../constants/config';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import CreatedBuyVideoContainer from './created.buy-video.container';
import DoingBuyVideoContainer from './doing.buy-video.container';
import DoneBuyVideoContainer from './done.buy-video.container';

const initialLayout = {
	height: 45,
	width: Dimensions.get('window').width,
};

const FirstRoute = () => <CreatedBuyVideoContainer />;
const SecondRoute = () => <DoingBuyVideoContainer />;
const ThreeRoute = () => <DoneBuyVideoContainer />;

/**
 * @author Hoat Ha
 * @description BuyVideo View
 */
class MakeVideoView extends Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'Đã tạo' },
			{ key: 'second', title: 'Đang làm' },
			{ key: 'three', title: 'Đã làm' },
		],
	};
	static navigationOptions = {
		title: 'Mua Video / Dự án của tôi',
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
			<View style={styles.container}>
				<TabViewAnimated

					navigationState={this.state}
					renderScene={this.drawScence}
					renderHeader={this.drawHeader}
					onIndexChange={this.changeTabIndex}
					initialLayout={initialLayout}
				/>
				<View style={styles.flowCreation}>
					<TouchableOpacity style={styles.creation} onPress={() => this.props.navigate({ routeName: 'NewBuyVideo' })}>
						<Text style={{ padding: 10, color: 'white', paddingLeft: 20, paddingRight: 20, fontWeight: 'bold' }}>Tạo dự án mới</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default MakeVideoView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
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
	creation: {
		backgroundColor: AppConfig.headerStyleColor,
		borderColor: AppConfig.headerStyleColor,
		borderRadius: 5.0,
		borderWidth: 1.0,
		marginBottom: 15,
	},
	flowCreation: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
});