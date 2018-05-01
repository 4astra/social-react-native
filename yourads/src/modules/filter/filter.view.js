import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Button,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import Slider from "react-native-slider";
import AppConfig from '../../constants/config';

const { width, height } = Dimensions.get('window');
let _this = null;

/**
 * @author Hoat Ha
 * @description Filter view for search
 */

class FilterView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text style={{ marginLeft: 12, fontSize: 13 }}>Huỷ</Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => _this.resetFilter()}>
          <Text style={{ marginRight: 12, fontSize: 13, color: 'red' }}>Phục hồi</Text>
        </TouchableOpacity>
      ),
      title: 'Lọc dữ liệu',
      headerTintColor: AppConfig.oppositeHeaderTintColor,
      headerStyle: ({
        backgroundColor: AppConfig.oppositeHeaderStyleColor
      })
    };
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    filters: PropTypes.any,
    actions: PropTypes.shape({
      putDistance: PropTypes.func.isRequired,
      putPriceFrom: PropTypes.func.isRequired,
      putPriceTo: PropTypes.func.isRequired,
      putEmotion: PropTypes.func.isRequired,
      putJob: PropTypes.func.isRequired,
      putVideo: PropTypes.func.isRequired,
      filterCategory: PropTypes.func.isRequired,
      resetFilterCategory: PropTypes.func.isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);
  }

  resetFilter = () => {
    console.log('reset');
    this.props.actions.resetFilterCategory();
  }

  priceSliderChange = (values) => {
    console.log(values);
    this.props.actions.putPrice(values);
  }

  doChangeEmotion = (item) => {
    var obj = item.toObject();
    this.props.actions.putEmotion(obj);
  }

  doChangeJob = (item) => {
    var obj = item.toObject();
    this.props.actions.putJob(obj);
  }

  doChangeVideo = (item) => {
    var obj = item.toObject();
    this.props.actions.putVideo(obj);
  }

  doFilter = () => {
    this.props.actions.filterCategory();
    this.props.navigate({ type: "Navigation/BACK", routeName: "", key: "" });
  }

  componentDidMount = () => {
    _this = this;
  }

  doChangeDistance = (value) => {
    console.log('Value: ' + value);
    this.props.actions.putDistance(value);
  }

  doChangePriceFrom = (price) => {
    console.log('Price f: ' + price);
    let newPrice = parseInt(price);
    if(!isNaN(newPrice)) {
      var priceTo = this.props.filters.getIn(['price', 'to']);
      priceTo = parseInt(priceTo);
      if(newPrice < priceTo) {
        this.props.actions.putPriceFrom('' + newPrice);
      }
    } else {
      this.props.actions.putPriceFrom('0');
    }
  }

  doChangePriceTo = (price) => {
    console.log('Price t: ' + price);
    let newPrice = parseInt(price);
    if(!isNaN(newPrice)) {
      var priceFrom = this.props.filters.getIn(['price', 'from']);
      priceFrom = parseInt(priceFrom);
      if(newPrice > priceFrom) {
        this.props.actions.putPriceTo('' + newPrice);
      }
    }
  }

  endKeyboard = () => {
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{
            flexDirection: 'column', marginTop: 15, alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, width: width - 20 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Khoảng cách:</Text>
                <Text style={{ fontSize: 20, marginTop: -3, marginBottom: 25 }}> (0 - {this.props.filters.getIn(['distance', 'value'])}) km</Text>
              </View>
            </View>
            <Slider style={styles.slider} thumbTintColor={AppConfig.headerStyleColor}
              value={this.props.filters.getIn(['distance', 'value'])} minimumValue={this.props.filters.getIn(['distance', 'min'])} maximumValue={this.props.filters.getIn(['distance', 'max'])} step={this.props.filters.getIn(['distance', 'step'])}
              onValueChange={value => this.doChangeDistance(value)}
            />
          </View>
          <View style={{
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ flexDirection: 'row', marginLeft: 20, width: width - 20 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Giá cả</Text>
                <Text style={{ fontSize: 13, marginTop: 3, marginBottom: 25 }}> (x1000 VND)</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignContent: "center" }}>
              <TextInput style={styles.textInput} keyboardType='numeric'
                autoFocus={false}
                onChangeText={
                  (text) => this.doChangePriceFrom(text)
                }
                value={this.props.filters.getIn(['price', 'from'])}
                onSubmitEditing={(event) => this.doChangePriceFrom(event.nativeEvent.text)}
                returnKeyType={'done'}
              />
              <Text style={{ height: 30, marginTop: 10 }}> đến </Text>

              <TextInput style={styles.textInput} keyboardType='numeric'
                autoFocus={false}
                onChangeText={
                  (text) => this.doChangePriceTo(text)
                }
                value={this.props.filters.getIn(['price', 'to'])}
                onSubmitEditing={(event) => this.doChangePriceTo(event.nativeEvent.text)}
                returnKeyType={'done'}
              />
            </View>
          </View>

          {/* Emotion */}
          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
            <Text style={styles.filterTitle}>Cảm xúc</Text>
            <FlatList scrollEnabled={false}
              data={this.props.filters.get('emotion').toArray()}
              renderItem={({ item, separators }) => (
                <TouchableOpacity
                  onPress={() => this.doChangeEmotion(item)}>
                  <View style={styles.filter}>
                    <Text style={styles.filterSubTitle}>{item.get('name')}</Text>
                    <Image
                      style={styles.filterImage}
                      source={item.get('isSelect') ? require('../../../images/select-checkbox.png') : require('../../../images/checkbox.png')} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Job */}
          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 5 }}>
            <Text style={styles.filterTitle}>Ngành nghề</Text>
            <FlatList scrollEnabled={false}
              data={this.props.filters.get('job').toArray()}
              renderItem={({ item, separators }) => (
                <TouchableOpacity
                  onPress={() => this.doChangeJob(item)}>
                  <View style={styles.filter}>
                    <Text style={styles.filterSubTitle}>{item.get('name')}</Text>
                    <Image
                      style={styles.filterImage}
                      source={item.get('isSelect') ? require('../../../images/select-checkbox.png') : require('../../../images/checkbox.png')} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Video */}
          <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 5 }}>
            <Text style={styles.filterTitle}>Loại video</Text>
            <FlatList scrollEnabled={false}
              style={{ marginLeft: 0, marginTop: 5, }}
              data={this.props.filters.get('video').toArray()}
              renderItem={({ item, separators }) => (
                <TouchableOpacity
                  onPress={() => this.doChangeVideo(item)}>
                  <View style={styles.filter}>
                    <Text style={styles.filterSubTitle}>Video {item.get('name')}</Text>
                    <Image
                      style={styles.filterImage}
                      source={item.get('isSelect') ? require('../../../images/select-checkbox.png') : require('../../../images/checkbox.png')} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ flexDirection: 'column', margin: 15, alignContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.filterButton} onPress={() => this.doFilter()}>
              <Text style={{ fontSize: 15, color: 'white', }}>Áp dụng Lọc</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbfa'
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  filterTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  filterSubTitle: {
    width: (width - 40 * 2 - 20)
  },
  filterImage: {
    width: 40, height: 40
  },
  slider: {
    width: 300,
    alignItems: "stretch",
    justifyContent: "center"
  },
  textSlider: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 25, width: width - 25, marginLeft: 15
  },
  filterButton: {
    backgroundColor: AppConfig.headerStyleColor,
    borderColor: AppConfig.headerStyleColor,
    borderRadius: 5,
    width: 140,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 100,
    height: 35,
    margin: 5,
    fontSize: 17,
    color: AppConfig.headerStyleColor,
    fontWeight: 'bold',
    borderColor: '#DDDDDD',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 5
  }
});

export default FilterView;
