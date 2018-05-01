import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	View,
	StyleSheet,
	Dimensions,
	Image,
	Text,
	TouchableOpacity,
	FlatList,
	TouchableHighlight,
	ScrollView,
	ListView
} from 'react-native';
import AppConfig from '../../constants/config';
import Carousel from 'react-native-snap-carousel';
import dummyData from './data';

const { width, height } = Dimensions.get('window');
const horizontalMargin = 0;
const slideWidth = Dimensions.get('window').width / 2.0; //

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + (horizontalMargin * 2);
const itemHeight = 100;


/**
 * @author Hoat Ha
 * @description Home page place to introduce hottest product, supplier ...etc
 */
class HomeView extends Component {

	static navigationOptions = {
		title: 'Home',
		headerTintColor: AppConfig.headerTintColor,
		headerStyle: {
			backgroundColor: AppConfig.headerStyleColor
		},
		headerLeft: null
	}

	static propTypes = {
		topProviders: PropTypes.any,
		topContractors: PropTypes.any,
		topBuyers: PropTypes.any,
		videosTemplate: PropTypes.any,
		navigate: PropTypes.func.isRequired,
		homeAction: PropTypes.shape({
			topProviders: PropTypes.func.isRequired,
			topContractors: PropTypes.func.isRequired,
			topBuyers: PropTypes.func.isRequired,
			videosTemplate: PropTypes.func.isRequired,
		}).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			size: { width, height },
			data: dummyData,
		};
	}

	componentDidMount() {
		this.props.homeAction.topProviders();
		this.props.homeAction.topContractors();
		this.props.homeAction.topBuyers();
		this.props.homeAction.videosTemplate();
	}

	renderSlideTop({ item, index }) {
		return (
			<View style={styles.slide}>
				<View style={styles.slideInnerContainer}>
					<Text style={styles.container}>{item.title}</Text>
					<Image style={{ width: slideWidth, height: 100 }} source={{ uri: item.illustration }} />
				</View>
			</View>
		);
	}

	_onPress = () => {

	}

	goMakeVideo = () => {
		this.props.navigate({ routeName: 'MakeVideo'});
		// this.props.navigate({ type: "Navigation/NAVIGATE", routeName: "MakeVideo", key: "MakeVideo" });
	}

	goBuyVideo = () => {
		this.props.navigate({ routeName: 'BuyVideo'});
	}

	render() {

		return (
			<View style={styles.container}>
				<ScrollView>
					<View>
						<Carousel
							ref={(c) => { this._carousel = c; }}
							data={this.state.data}
							renderItem={this.renderSlideTop}
							sliderWidth={sliderWidth}
							itemWidth={itemWidth}
							autoplay={true}
							loop={true}
						/>
					</View>
					<View style={styles.makeVideoTop}>
						<TouchableOpacity
							style={[styles.productVideoContainer, { backgroundColor: '#B279FB', marginRight: 10 }]}
							onPress={() => this.goBuyVideo()}>
							<Image resizeMode="contain" style={styles.videoButtons} source={require('../../../images/yourads_buy_video.jpg')} />
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.productVideoContainer, { backgroundColor: '#14B4FB' }]}
							onPress={()=> this.goMakeVideo()}>
							<Image resizeMode="contain" style={styles.videoButtons} source={require('../../../images/yourads_make_video.jpg')} />
						</TouchableOpacity>
					</View>

					<View style={{ marginTop: 15 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={[styles.rectangleView, { borderColor: '#349d4b' }]}></View>
							<Text style={styles.textHeadingStyle}>Nhà cung cấp tiêu biểu</Text>
						</View>
						<FlatList horizontal={true} style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
							data={this.props.topProviders}
							renderItem={({ item, separators }) => (
								<TouchableOpacity style={styles.circleButton}
									onPress={() => this._onPress(item)}>
									<View style={{ backgroundColor: 'white' }}>
										<Image style={styles.circleButton} source={{ uri: item.avatar }} />
									</View>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
						/>
					</View>

					<View>
						<View style={{ flexDirection: 'row' }}>
							<View style={[styles.rectangleView, { borderColor: '#349d4a' }]}></View>
							<Text style={styles.textHeadingStyle}>Người mua mới</Text>
						</View>
						<FlatList horizontal={true}
							style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
							data={this.props.topContractors}
							renderItem={({ item, separators }) => (
								<TouchableOpacity
									onPress={() => this._onPress(item)}>
									<View style={{ backgroundColor: 'white' }}>
										<Image style={{ width: 110, height: 100, margin: 5 }} source={{ uri: item.avatar }} />
									</View>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
						/>
					</View>

					<View>
						<View style={{ flexDirection: 'row' }}>
							<View style={[styles.rectangleView, { borderColor: '#34934b' }]}></View>
							<Text style={styles.textHeadingStyle}>Người bán mới</Text>
						</View>
						<FlatList horizontal={true}
							style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
							data={this.props.topBuyers}
							renderItem={({ item, separators }) => (
								<TouchableOpacity
									onPress={() => this._onPress(item)}>
									<View style={{ backgroundColor: 'white' }}>
										<Image style={{ width: 110, height: 100, margin: 5 }} source={{ uri: item.avatar }} />
									</View>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
						/>
					</View>

					<View>
						<View style={{ flexDirection: 'row' }}>
							<View style={[styles.rectangleView, { borderColor: '#349d4a' }]}></View>
							<Text style={[styles.textHeadingStyle, { marginLeft: 5, marginBottom: 15 },]}>Video tham khảo</Text>
						</View>
						<FlatList horizontal={false}
							style={{ marginLeft: 0, marginBottom: 15, marginRight: 0 }}
							data={this.props.videosTemplate}
							numColumns={3}
							renderItem={({ item, separators }) => (

								<TouchableOpacity
									onPress={() => this._onPress(item)}>
									<View style={{ backgroundColor: 'white' }}>

										<Image style={{ width: (width / 3.0 - 10.0), height: 100, margin: 5 }} source={{ uri: item.thumbnail_img }} />
									</View>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index}
						/>
					</View>
				</ScrollView>
			</View>

		);
	}
}

const circle = {
	borderWidth: 0,
	borderRadius: 40,
	width: 80,
	height: 80
};

const rectangle = {
	borderWidth: 1,
	width: 1,
	height: 18
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	slide: {
		width: itemWidth,
		height: itemHeight,
		paddingHorizontal: horizontalMargin
	},
	slideInnerContainer: {
		width: slideWidth,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	makeVideoTop: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	productVideoContainer: {
		width: 150,
		height: (2 / 3) * 150,
		borderRadius: 10
	},
	videoButtons: {
		marginTop: 8,
		marginLeft: 17,
		width: 120,
		height: (2 / 3) * 120,
	},
	circleButton: {
		...circle,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
	},
	rectangleView: {
		...rectangle,
		marginRight: 5,
		marginLeft: 1,
	},
	textHeadingStyle: {
		color: '#170A1C'
	}
});

export default HomeView;
