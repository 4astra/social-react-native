import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  Alert
} from 'react-native';

import * as AppFormatter from '../../utils/formatter';
import AppConfig from '../../constants/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// declare constant 
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class IsWaitingMakeVideoView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    isSpecifyBidder: PropTypes.bool.isRequired,
    lstPublicBidder: PropTypes.any,
    lstSpecifyBidder: PropTypes.any,
    actions: PropTypes.shape({
      publicBidding: PropTypes.func.isRequired,
      specifyBidding: PropTypes.func.isRequired,
      addTempPriceForPublicBidder: PropTypes.func.isRequired,
      addTempPriceForSpecifyBidder: PropTypes.func.isRequired,
      bidPrice: PropTypes.func.isRequired,
      changeBiddingType: PropTypes.func.isRequired
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      hsList: [
        { title: 'Đấu giá công khai', isSelected: true, id: 1 },
        { title: 'Chỉ định thầu', isSelected: false, id: 2 }
      ],
      indexHeaderSegment: 1,
    };
  }

  componentDidMount() {
    this.props.actions.publicBidding();
    this.props.actions.specifyBidding();
  }

  typePrice = (item, text) => {
    var number = parseInt(text);
    if (!isNaN(number)) {
      if (this.props.isSpecifyBidder == false) {
        this.props.actions.addTempPriceForPublicBidder(item.id, text);
      } else {
        this.props.actions.addTempPriceForSpecifyBidder(item.id, text);
      }
    }
  }

  ShowAlertDialog = (item) => {

    let summitPrice = item.submitPrice;
    if (summitPrice === undefined || summitPrice === null) {
      Alert.alert(
        null, 'Vui lòng cung cấp giá đấu thầu cho dự án: ' + '"' + item.name + '"',
        [
          { text: 'Đồng ý', style: 'cancel' }
        ]
      )
    } else {
      var bidPrice = parseInt(summitPrice);
      console.log('Begin bid price for: ' + item.id + ', amount: ' + item.price);

      if (bidPrice < 0) {
        Alert.alert(null, 'Giá đấu không hợp lệ, giá đấu phải nguyên dương', [{ text: 'Đồng ý', style: 'cancel' }])
      } else if (bidPrice > item.price) {
        Alert.alert(null, 'Giá đấu không hợp lệ, giá đấu phải nhỏ hơn hoặc bằng giá dự án', [{ text: 'Đồng ý', style: 'cancel' }])
      } else {
        Alert.alert(
          null, 'Bạn có chắc đấu thầu dự án này giá: ' + AppFormatter.currency(bidPrice),
          [
            {
              text: 'Huỷ', onPress: () => {

              }, style: 'cancel'
            },
            {
              text: 'Đồng ý', onPress: () => {

                this.props.actions.bidPrice(item.id, bidPrice).then((_) => {

                  // reload view after bidding a price of project
                  if (!this.props.isSpecifyBidder) {
                    this.props.actions.publicBidding();
                  } else {
                    this.props.actions.specifyBidding();
                  }

                  Alert.alert(null, 'Bạn đã chào giá thành công!', [{ text: 'Đồng ý', style: 'cancel' }]);
                });

              }, style: "default"
            },
          ]
        )
      }
    }
  }

  selHeaderSegmentIndex(item) {

    var temp = this.state.hsList;

    for (let i = 0; i < temp.length; i++) {
      if (i == item.id - 1) {
        temp[i].isSelected = true;
      } else {
        temp[i].isSelected = false;
      }
    }

    this.setState({ hsList: temp });

    if (item.id == 1) {
      this.props.actions.changeBiddingType(false);
    } else {
      this.props.actions.changeBiddingType(true);
    }
  }

  renderHeaderSegment() {
    return this.state.hsList.map((item) => {
      return (
        <TouchableOpacity style={styles.subHeaderSegment} onPress={() => this.selHeaderSegmentIndex(item)} key={item.id}>
          <Text style={[styles.subTextHeaderSegment, { fontWeight: item.isSelected ? 'bold' : 'normal' }]}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
  }

  renderBidPriceView(item) {

    if (!item.dauthau) {
      return (
        <View>

          <View style={{ backgroundColor: '#EFEFF4', width: width - 12, height: 5, marginTop: 5 }}></View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={styles.priceText} keyboardType='numeric' placeholder="Báo giá cho dự án này"
              autoFocus={false}
              returnKeyType={'done'}
              onSubmitEditing={(event) => this.typePrice(item, event.nativeEvent.text)}
            />
            <TouchableOpacity onPress={() => this.ShowAlertDialog(item)}>
              <Text style={styles.submitPrice}>Báo Giá</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#EFEFF4', width: width - 12, height: 5, marginBottom: 0 }}></View>

        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: '#EFEFF4' }}>

          <View style={{ width: width - 12, height: 1, marginTop: 5 }}></View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>  Đã đấu thầu: </Text>
            <Text style={styles.numbers}> {AppFormatter.currency(item.dauthau != null ? item.dauthau : 0)} </Text>
          </View>

          <View style={{ width: width - 12, height: 3, marginBottom: 0 }}></View>

        </View>
      );
    }
  }

  renderMainContent() {
    const dataSource = this.props.isSpecifyBidder == false ? this.props.lstPublicBidder : this.props.lstSpecifyBidder;
    if (dataSource.length > 0) {
      return (
        <FlatList style={{ marginLeft: 0, marginTop: 0, marginBottom: 15 }}
          data={dataSource}
          renderItem={({ item, separators }) => (
            <View style={{ flexDirection: 'column', margin: 5, borderColor: '#EFEFF4', borderWidth: 1.0, borderRadius: 3.0 }}>
              <View style={{ flexDirection: 'column', marginTop: 5, }}>
                <Text>  {item.name} [{item.id}] </Text>
                <Text>  Loại hợp đồng: {item.contract_type} </Text>
                <Text>  Loại cảm xúc: {item.emotion} </Text>
                <Text>  Loại ngành nghề: {item.product_type} </Text>
                <Text>  Loại video: {item.video_duration} </Text>
                <Text>  Giá: {AppFormatter.currency(item.price != null ? item.price : 0)} </Text>
                <Text>  Thời gian cần: {item.expected_date} </Text>
                <Text>  Nội dung yêu cầu: {item.content} </Text>
              </View>
              {/*Báo giá cho dự án này*/}
              {
                this.renderBidPriceView(item)
              }
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      );
    } else {
      return (
        <View style={styles.noData}>
          <Text style={{marginTop: (height / 2.0 - 100)}}>Không có dữ liệu</Text>
        </View>
      );
    }
  }

  render() {
    //console.log('Data: ' + this.props.isSpecifyBidder == false ? this.props.lstPublicBidder : this.props.lstSpecifyBidder);
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.headerSegment}>
            {
              this.renderHeaderSegment()
            }
          </View>
          {
            this.renderMainContent()
          }
        </KeyboardAwareScrollView>
      </View>);
  }
}

export default IsWaitingMakeVideoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  headerSegment: {
    flexDirection: 'row',
  },
  subHeaderSegment: {
    alignItems: 'center',
    width: width / 2.0,
    backgroundColor: 'white',
    height: 30,
  },
  subTextHeaderSegment: {
    textAlign: 'center',
    marginTop: 8,
  },
  submitPrice: {
    color: AppConfig.headerStyleColor,
    fontWeight: 'bold',
    marginRight: 5.0,
  },
  priceText: {
    width: width - 85, height: 35, marginLeft: 5, marginRight: 0, fontSize: 13,
    fontSize: 15
  },
  numbers: {
    color: AppConfig.numberColor,
    fontWeight: 'bold'
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
