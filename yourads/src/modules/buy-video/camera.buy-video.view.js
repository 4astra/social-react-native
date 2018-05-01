import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	TouchableHighlight,
	FlatList,
	Image,
	ScrollView,
	Alert
} from 'react-native';

import AppConfig from '../../constants/config';
import * as AppFormatter from '../../utils/formatter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cameraRectW = (width - 20) / 3 - 10 * 2;
const cameraIconW = 30;
/**
 * @author Hoat Ha
 * @description BuyVideo View
 */
class CameraBuyVideoView extends Component {

	static navigationOptions = {
		title: 'Chụp ảnh sản phẩm',
		headerTintColor: AppConfig.headerTintColor,
		headerStyle: {
			backgroundColor: AppConfig.headerStyleColor
		},
	};

	static propTypes = {
		navigate: PropTypes.func.isRequired,
		lstCamera360: PropTypes.any,
		actions: PropTypes.shape({
			initListCamera360: PropTypes.func.isRequired,
			changeCaptureType: PropTypes.func.isRequired,
			changeCaptureCameraNum: PropTypes.func.isRequired,
		}),
	};
	
	componentDidMount() {
		this.props.actions.initListCamera360();
	}

	goToCaptureContinue() {
		this.props.actions.changeCaptureType(true).then(res => {
			this.props.navigate({ routeName: 'CameraCaptureBuyVideo' });
		});
	}

	goToCaptureCurrentCameraNum(item) {
		this.props.actions.changeCaptureCameraNum(item.id).then(res => {
			this.props.navigate({ routeName: 'CameraCaptureBuyVideo' });
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.block}>
						<View style={styles.flowDropDown}>
							<TouchableOpacity style={styles.dropDown} onPress={() => { this.goToCaptureContinue() }}>
								<Text style={styles.textDropDown}>Chọn chụp liên tiếp 52 ảnh</Text>
							</TouchableOpacity>
						</View>
						<Text style={{ marginLeft: 10, marginTop: 20, marginBottom: 10 }}>hoặc chọn chụp từng ảnh</Text>

						<FlatList horizontal={false}
							style={{ margin: 10 }}
							data={this.props.lstCamera360}
							numColumns={3}
							renderItem={({ item, separators }) => (

								<TouchableOpacity style={{ margin: 10 }} onPress={() => { this.goToCaptureCurrentCameraNum(item) }}>
									<View style={[styles.cameraRect, { flexDirection: 'column' }]}>
										<View style={[styles.cameraRect, {
											flexDirection: 'row',
										}]}>
											<View style={[styles.cameraRect, {
												backgroundColor: '#E3E3E3',
												borderColor: '#E3E3E3',
												borderRadius: 5.0,
												borderWidth: 1.0
											}]} />
											<Image style={{
												width: cameraIconW, height: cameraIconW,
												marginLeft: -(cameraRectW + cameraIconW) / 2,
												marginTop: (cameraRectW - cameraIconW) / 2
											}}
												source={require('../../../images/solid_camera.png')} />
										</View>
										<Text style={{
											height: 20,
											color: 'gray',
											backgroundColor: '#E3E3E3',
											marginLeft: item.id < 10 ? cameraRectW - 10 : cameraRectW - 20,
											marginTop: -25
										}}>{item.id}</Text>
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

export default CameraBuyVideoView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	block: { flexDirection: 'column', marginTop: 10 },
	textDropDown: { textAlign: 'center', width: width - 20, height: 30, paddingTop: 5 },
	dropDown: { borderColor: AppConfig.headerStyleColor, borderRadius: 5, borderWidth: 1.0 },
	flowDropDown: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
	cameraRect: {
		width: cameraRectW, height: cameraRectW,
	}

});