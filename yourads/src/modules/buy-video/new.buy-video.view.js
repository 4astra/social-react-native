import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	TouchableHighlight
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import AppConfig from '../../constants/config';
import * as AppFormatter from '../../utils/formatter';
import ActionSheet from 'react-native-actionsheet'


const CANCEL_INDEX = 0
// const DESTRUCTIVE_INDEX = 4

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
/**
 * @author Hoat Ha
 * @description BuyVideo View
 */
class NewBuyVideoView extends Component {

	static navigationOptions = {
		title: 'Mua Video / Tạo dự án',
		headerTintColor: AppConfig.headerTintColor,
		headerStyle: {
			backgroundColor: AppConfig.headerStyleColor
		},
	};

	static propTypes = {
		navigate: PropTypes.func.isRequired,
		commonCodes: PropTypes.any,
		actions: PropTypes.shape({

		}),
	};

	state = {
		isModalVisible: false
	};

	_toggleModal = () =>
		this.setState({ isModalVisible: !this.state.isModalVisible });

	writeContent() {
		this.setState({ isModalVisible: true });
	}

	showContractType() {
		this.asContract.show()
	}

	selectContactAtIndex(i) {

	}

	showEmotionType() {
		this.asEmotion.show()
	}

	selectEmotionAtIndex(i) {

	}

	showJobType() {
		this.asJob.show()
	}

	selectJobAtIndex(i) {

	}

	showVideoType() {
		this.asVideo.show()
	}

	selectVideoAtIndex(i) {

	}

	render() {
		var contractOptions = ['Huỷ bỏ'];
		const contracts = this.props.commonCodes.get('contracts').toJS();
		contracts.forEach(function (obj) {
			contractOptions.push(obj.name)
		});

		var jobOptions = ['Huỷ bỏ'];
		const jobs = this.props.commonCodes.get('products').toJS();
		jobs.forEach(function (obj) {
			jobOptions.push(obj.name)
		});

		var emotionOptions = ['Huỷ bỏ'];
		const emotions = this.props.commonCodes.get('emotions').toJS();
		emotions.forEach(function (obj) {
			emotionOptions.push(obj.name)
		});

		var videoOptions = ['Huỷ bỏ'];
		const videos = this.props.commonCodes.get('categories').toJS();
		videos.forEach(function (obj) {
			videoOptions.push(obj.name)
		});

		return (

			<KeyboardAwareScrollView>

				<View style={styles.container}>
					<View style={styles.block}>
						<Text style={styles.titleBold}>Bước 1: Đặt tiêu đề dự án</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<Text style={styles.tips}>Tối đa 100 ký tự</Text>
						</View>
						<TextInput style={styles.input} placeholder="Ví dụ: Bộ sưu tập thu đông NTK Miu Miu" maxLength={100}></TextInput>
					</View>

					<View style={styles.block}>
						<Text style={styles.titleBold}>Bước 2: Chọn loại hợp đồng để thực hiện</Text>
						<View style={styles.flowDropDown}>
							<TouchableOpacity style={styles.dropDown} onPress={() => this.showContractType()}>
								<Text style={styles.textDropDown}>Chọn loại hợp đồng</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }}>
							<TouchableOpacity style={{ borderColor: AppConfig.headerStyleColor, borderRadius: 3, borderWidth: 1.0, marginLeft: 10 }} onPress={() => {
								this.writeContent();
							}}>
								<Text style={{ marginLeft: 10, fontWeight: 'bold', marginRight: 10 }}>Viết nội dung</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.props.navigate({ routeName: 'CameraBuyVideo' })}
								style={{ borderColor: AppConfig.headerStyleColor, borderRadius: 3, borderWidth: 1.0, marginLeft: 10, marginRight: 10 }}>
								<Text Text style={{ marginLeft: 10, fontWeight: 'bold', marginRight: 10 }}>Chụp 360</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.block}>
						<Text style={styles.titleBold}>Bước 3: Loại hình Video</Text>
						<View style={styles.flowDropDown}>
							<TouchableOpacity style={[styles.dropDown, { marginTop: 10 }]} onPress={()=> this.showEmotionType()}>
								<Text style={styles.textDropDown}>Chọn Video theo cảm xúc</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.dropDown, { marginTop: 10 }]} onPress={()=> this.showJobType()}>
								<Text style={styles.textDropDown}>Chọn Video theo ngành nghề</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.dropDown, { marginTop: 10 }]} onPress={()=> this.showVideoType()}>
								<Text style={styles.textDropDown}>Chọn độ dài Video</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.block}>
						<Text style={styles.titleBold}>Bước 4: Nhập mức phí cho Video</Text>
						{/* Suggest 1 */}
						<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<Text style={styles.tips}>Mức nhập nhỏ nhất là: {AppConfig.symbolCurrencyVN}300.000</Text>
						</View>
						{/* Suggest 2 */}
						<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<Text style={styles.tips}>Số tiền nhập phải là bội số của: {AppConfig.symbolCurrencyVN}100.000</Text>
						</View>
						<TextInput style={styles.input} placeholder="Nhập giá tiền" keyboardType='numeric'></TextInput>
						<Text style={{ textAlign: 'center', textAlignVertical: 'center', marginTop: 10, marginBottom: 10 }}>
							hoặc chọn gói sau:
						</Text>
						<View style={{
							flexDirection: 'row', justifyContent: 'center'
						}}>
							<TouchableOpacity style={styles.priceButton}>
								<Text style={[styles.priceText, { color: AppConfig.numberColor, fontWeight: 'bold', fontSize: 15 }]}>{AppFormatter.currency(2000000)}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.priceButton, { marginLeft: 3.0 }]}>
								<Text style={[styles.priceText, { color: AppConfig.numberColor, fontWeight: 'bold', fontSize: 15 }]}>{AppFormatter.currency(1000000)}</Text>
							</TouchableOpacity>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
							<TouchableOpacity style={styles.priceButton}>
								<Text style={[styles.priceText, { color: AppConfig.numberColor, fontWeight: 'bold', fontSize: 15 }]}>{AppFormatter.currency(500000)}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.priceButton, { marginLeft: 3.0 }]}>
								<Text style={[styles.priceText, { color: AppConfig.numberColor, fontWeight: 'bold', fontSize: 15 }]}>{AppFormatter.currency(300000)}</Text>
							</TouchableOpacity>
						</View>

						<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
							<Text style={{ marginLeft: 10 }}>Ngày muốn nhận Video:</Text>
							<TouchableOpacity>
								<Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 15 }}>{'09/03/2018'}</Text>
							</TouchableOpacity>
						</View>
					</View>


					<View style={styles.block}>
						<Text style={styles.titleBold}>Bước 5: Chọn nhà cung cấp</Text>
						<Text style={{ textAlign: 'center', textAlignVertical: 'center', marginTop: 10, marginBottom: 10 }}>
							hình thức đấu giá
						</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity style={styles.priceButton}>
								<Text style={styles.priceText}>Công khai</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.priceButton, { marginLeft: 3 }]}>
								<Text style={styles.priceText}>Chỉ định</Text>
							</TouchableOpacity>
						</View>
						<Text style={{ textAlign: 'center', textAlignVertical: 'center', marginTop: 10, }}>
							hoặc lựa chọn
						</Text>
						<TouchableOpacity style={{ borderColor: '#EFEFF4', borderWidth: 1.0, margin: 10, height: 40 }}>
							<Text style={{ textAlign: 'center', marginTop: 10 }}>Chọn tất cả</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.block}>
						<Text style={styles.titleBold}>Bước 6: Xác nhận</Text>
						<Text style={{ marginLeft: 10 }}>- Bạn đã chọn: {'Chọn tất cả'} là đối tác</Text>
						<Text style={{ marginLeft: 10 }}>- Thời gian nhận Video ngày {'09/03/2018'}</Text>
						<Text style={{ marginLeft: 10 }}>- Kinh phí {AppFormatter.currency(0)}</Text>
						<Text style={{ marginLeft: 10 }}>Nhập mã khuyến mãi (nếu có)</Text>
						<TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Nhập mã code" keyboardType='numeric'></TextInput>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20, alignContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity>
							<Text style={{ color: AppConfig.tabInactiveTintColor }}>Huỷ bỏ</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ backgroundColor: AppConfig.headerStyleColor, borderRadius: 5.0, borderWidth: 1.0, borderColor: AppConfig.headerStyleColor, marginLeft: 20, marginRight: 10 }}>
							<Text style={{ color: 'white', fontWeight: 'bold', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>Đồng ý</Text>
						</TouchableOpacity>
					</View>

				</View>

				<Modal isVisible={this.state.isModalVisible}>
					<View style={{ flex: 1, marginTop: 40 }}>
						<View style={{ backgroundColor: 'white', borderColor: 'white', borderRadius: 3, borderWidth: 1.0 }}>
							<TextInput placeholder="Nhập nội dung" multiline={true} style={{
								height: height / 3.0, margin: 5, padding: 5,
								borderColor: AppConfig.headerStyleColor, borderRadius: 3.0, borderWidth: 1.0
							}}></TextInput>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20, alignContent: 'center', alignItems: 'center' }}>

								<TouchableOpacity onPress={this._toggleModal}>
									<Text style={{ color: AppConfig.tabInactiveTintColor }}>Huỷ bỏ</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ backgroundColor: AppConfig.headerStyleColor, borderRadius: 5.0, borderWidth: 1.0, borderColor: AppConfig.headerStyleColor, marginLeft: 20, marginRight: 10 }}>
									<Text style={{ color: 'white', fontWeight: 'bold', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>Lưu lại</Text>
								</TouchableOpacity>
							</View>
						</View>

					</View>
				</Modal>

				<ActionSheet
					ref={o => this.asContract = o}
					title={'Chọn loại hợp đồng'}
					options={contractOptions}
					cancelButtonIndex={CANCEL_INDEX}
					// destructiveButtonIndex={DESTRUCTIVE_INDEX}
					onPress={this.selectContactAtIndex}
				/>

				<ActionSheet
					ref={o => this.asEmotion = o}
					title={'Chọn loại cảm xúc'}
					options={emotionOptions}
					cancelButtonIndex={CANCEL_INDEX}
					// destructiveButtonIndex={DESTRUCTIVE_INDEX}
					onPress={this.selectEmotionAtIndex}
				/>

				<ActionSheet
					ref={o => this.asJob = o}
					title={'Chọn loại nghành nghề'}
					options={jobOptions}
					cancelButtonIndex={CANCEL_INDEX}
					// destructiveButtonIndex={DESTRUCTIVE_INDEX}
					onPress={this.selectJobAtIndex}
				/>

				<ActionSheet
					ref={o => this.asVideo = o}
					title={'Chọn loại Video'}
					options={videoOptions}
					cancelButtonIndex={CANCEL_INDEX}
					// destructiveButtonIndex={DESTRUCTIVE_INDEX}
					onPress={this.selectVideoAtIndex}
				/>
			</KeyboardAwareScrollView>

		);
	}
}

export default NewBuyVideoView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	titleBold: {
		fontWeight: 'bold',
		marginLeft: 5
	},
	tips: {
		fontSize: 10,
		color: 'gray',
		paddingRight: 5,
		marginRight: 10,
	},
	input: {
		borderWidth: 1.0,
		borderColor: '#EFEFF4',
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 5,
		height: 35
	},
	block: { flexDirection: 'column', marginTop: 10 },
	textDropDown: { textAlign: 'center', width: width - 20, height: 30, paddingTop: 5 },
	dropDown: { borderColor: AppConfig.headerStyleColor, borderRadius: 5, borderWidth: 1.0 },
	flowDropDown: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
	priceButton: { borderColor: '#EFEFF4', borderWidth: 1.0, borderRadius: 3.0, height: 40 },
	priceText: { width: (width - 20) / 2.0, textAlign: 'center', marginTop: 10 },

});