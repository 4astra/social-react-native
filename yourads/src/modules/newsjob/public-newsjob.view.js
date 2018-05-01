import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Alert
} from 'react-native';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppConfig from '../../constants/config';
import * as AppFormatter from '../../utils/formatter';
import * as AppLocation from '../../utils/location';

// import dummyData from '../home/data';

const { width, height } = Dimensions.get('window');

/**
 * @author Hoat Ha
 * @description Show public News Job
 */
class PublicNewsJobView extends Component {
  static navigationOptions = {
    title: 'News Job',
    headerTintColor: AppConfig.headerTintColor,
    headerStyle: {
      backgroundColor: AppConfig.headerStyleColor
    },
    headerLeft: null
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    list: PropTypes.any,
    loading: PropTypes.bool.isRequired,
    isFilter: PropTypes.bool.isRequired,
    filterResult: PropTypes.any,
    keyword: PropTypes.string,
    publicNewsJobStateActions: PropTypes.shape({
      list: PropTypes.func.isRequired,
      filterKeyword: PropTypes.func.isRequired,
      addTempPrice: PropTypes.func.isRequired,
      bidPrice: PropTypes.func.isRequired
    }).isRequired,
  };

  constructor(props) {
    super(props);
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
      console.log('Begin bid price for: ' + item.id + ', amount: ' + bidPrice);

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

                this.props.publicNewsJobStateActions.bidPrice(item.id, bidPrice).then((res) => {
                  // refresh update data
                  this.props.publicNewsJobStateActions.list();
                  // Here is good message 
                  Alert.alert(null, 'Bạn đã chào giá thành công!', [{ text: 'Đồng ý', style: 'cancel' }])
                });
              }, style: "default"
            },
          ]
        )
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      (position) => {
        var location = JSON.stringify(position);
        console.log('New location: ', location);
        if (location !== null || location !== undefined) {
          AppLocation.setLocationInfo(JSON.stringify(position));
          this.props.publicNewsJobStateActions.list();
        }
      },
      (error) => { console.log('Error location:' + error.message); },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

    this.props.publicNewsJobStateActions.list();
  }

  startSearch(keyword) {
    var tmpKey = keyword.trim();
    if (tmpKey !== null && tmpKey !== undefined && tmpKey !== "") {
      this.props.publicNewsJobStateActions.filterKeyword(keyword);
    }
    else {
      this.props.publicNewsJobStateActions.resetFilterKeyword();
    }
  }

  endKeyboard = () => {

  }

  gotoFilterView = () => {
    this.props.navigate({ routeName: 'FilterModal' });
  }

  submitPrice = (keyword) => {
    console.log('Submit price: ' + keyword);
  }

  typePrice = (item, text) => {
    var number = parseInt(text);
    if (!isNaN(number)) {
      this.props.publicNewsJobStateActions.addTempPrice(item.id, text);
    }
  }

  renderMainContent() {

    var newData = !this.props.isFilter ? this.props.list : this.props.filterResult;

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={70}>
        <FlatList
          style={{ marginLeft: 0, marginTop: 0, marginBottom: 15 }}
          data={newData}
          renderItem={({ item, separators }) => (
            <View style={{ backgroundColor: 'white' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.circleButton, { margin: 10 }]}>
                  <Image style={styles.circleButton} source={item.user.avatar_url ? { uri: item.user.avatar_url } : require('../../../images/placeholder.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={[styles.subTitle, { marginTop: 5, marginBottom: 5, width: width - 80 - 10 * 2 }]}>{item.content}</Text>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={[styles.tags, { marginRight: 5 }]}>#{item.emotions[0].name}</Text>
                    <Text style={styles.numbers}>{AppFormatter.currency(item.price != null ? item.price : 0)}</Text>
                  </View>
                </View>
              </View>
              {/* Main image */}
              <Image
                style={{ width: width, height: width * (9.0 / 16.0) }}
                source={item.files360.length > 0 ? { uri: item.files360[0].file_path } : require('../../../images/placeholder.png')} />
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: 0, marginTop: 5, marginBottom: 5 }}
                data={item.files360}
                renderItem={({ item, separators }) => (
                  <View style={{ backgroundColor: 'white', marginRight: 3 }}>
                    <Image
                      style={{ width: 100, height: 100 * (9.0 / 16.0) }}
                      source={item ? { uri: item.file_path } : require('../../../images/placeholder.png')} />
                  </View>
                )}
                keyExtractor={(item, index) => item.id}
              />
              {/*Báo giá cho dự án này*/}
              {this.renderBidPriceView(item)}
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </KeyboardAwareScrollView>
    );
  }


  renderBidPriceView(item) {
    if (!item.dauthau) {
      return (
        <View>

          <View style={{ backgroundColor: '#EFEFF4', width: width, height: 5, marginBottom: 0 }}></View>
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

          <View style={{ backgroundColor: '#EFEFF4', width: width, height: 10, marginBottom: 0 }}></View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ backgroundColor: '#EFEFF4', width: width, height: 10, marginBottom: 0 }}></View>
          <View style={{ flexDirection: 'row', alignItems: 'center',height: 25 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>  Đã đấu thầu: </Text>
              <Text style={styles.numbers}> {AppFormatter.currency(item.dauthau != null ? item.dauthau : 0)} </Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#EFEFF4', width: width, height: 10, marginBottom: 0 }}></View>
        </View>

      );
    }
  }

  render() {

    return (
      <View style={[styles.container, { backgroundColor: '#EFEFF4' }]}>
        <View style={styles.search}>
          <TextInput style={styles.textInput}
            autoCorrect={false}
            autoFocus={false}
            placeholder="Nhập từ khoá để tìm"
            onChangeText={
              _.debounce((text) => this.startSearch(text), 2000)
            }
            value={this.props.keyword}
            onSubmitEditing={(event) => this.endKeyboard()}
          />
          <TouchableOpacity onPress={() => this.gotoFilterView()}>
            <Text>Lọc</Text>
          </TouchableOpacity>
        </View>

        {/* Display list news job posted by users  */}
        {this.renderMainContent()}
      </View>
    );
  }
}

const circle = {
  borderWidth: StyleSheet.hairlineWidth,
  width: 80,
  height: 80,
  borderRadius: 40,
  borderColor: '#DCDCDC'
};

const rectangle = {
  borderWidth: StyleSheet.hairlineWidth,
  width: width - 10,
  height: 35,
  borderRadius: 7
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    ...rectangle,
    flexDirection: 'row',
    borderColor: '#C7C7CD',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textInput: {
    width: width - 60,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 13
  },
  circleButton: {
    ...circle,
  },
  numbers: {
    color: AppConfig.numberColor,
    fontSize: 12
  },
  tags: {
    fontSize: 12,
    color: AppConfig.headerStyleColor
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 12,
  },
  priceText: {
    width: width - 70, height: 35, marginLeft: 5, marginRight: 5, fontSize: 13,
    fontSize: 15
  },
  submitPrice: {
    color: AppConfig.headerStyleColor,
    fontWeight: 'bold',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default PublicNewsJobView;