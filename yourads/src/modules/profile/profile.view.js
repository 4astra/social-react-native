import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  ScrollView,
  FlatList
} from 'react-native';

const { width, height } = Dimensions.get('window');
import profiles from './defaultData'
import AppConfig from '../../constants/config';

/**
 * @author Hoat Ha
 * @description Profile page see more features: change, update information...
 */
class ProfileView extends Component {

  static navigationOptions = {
    title: 'Profile',
    headerTintColor: AppConfig.headerTintColor,
    headerStyle: {
      backgroundColor: AppConfig.headerStyleColor
    },
    headerLeft: null
  }

  selectBasicProfile = () => {

  }

  share = () => {

  }

  seeDetail = (item) => {

  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      background: 'white',
      profileData: profiles
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ height: 120 }}>
            <Image style={{ width: width, height: 120 }} source={{ uri: 'http://i.imgur.com/2nCt3Sbl.jpg' }} />
          </View>

          <View style={styles.topView}>
            <TouchableOpacity>
              <Image style={styles.smallRect} source={{ uri: 'http://i.imgur.com/2nCt3Sbl.jpg' }} />
            </TouchableOpacity>
            <Image style={styles.circleButton} source={{ uri: 'http://i.imgur.com/2nCt3Sbl.jpg' }} />
            <TouchableOpacity>
              <Image style={styles.smallRect} source={{ uri: 'http://i.imgur.com/2nCt3Sbl.jpg' }} />
            </TouchableOpacity>
          </View>

          <View style={styles.basicInfo}>
            <Text>Your TV</Text>
            <Text>ID 39.075</Text>
          </View>

          <View style={styles.pointSummary}>
            <View
              style={[styles.pointButton, { backgroundColor: '#39babd', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }]}
            >
              <Text style={styles.pointLabel}>179.500</Text>
            </View>

            <TouchableOpacity
              style={[styles.pointButton, { backgroundColor: '#39cefd', borderTopRightRadius: 5, borderBottomRightRadius: 5 }]}
              onPress={this.onPress}>
              <Text style={styles.pointLabel}>Nạp tiền</Text>
            </TouchableOpacity>
          </View>

          <FlatList style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
            data={this.state.profileData}
            renderItem={({ item, separators }) => (
              <TouchableOpacity
                onPress={() => this.selectBasicProfile(item)}>
                <View style={styles.li} >
                  <Text style={styles.liText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.rectangleView, { borderColor: '#349d4a', marginLeft: 10 }]}></View>
            <Text>Video đã xem</Text>
          </View>

          <FlatList style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
            data={this.state.profileData}
            renderItem={({ item, separators }) => (

              <View>
                <TouchableOpacity onPress={() => this.seeDetail(item)}>
                  <Image style={styles.imageVideo} source={{ uri: 'http://i.imgur.com/2nCt3Sbl.jpg' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.share()}>
                  <View style={styles.shareLayout}></View>

                </TouchableOpacity>
                <View style={styles.videoLayout}>
                  <Text> Chuc mung nam moi </Text>
                  <View style={styles.videoCounterLayout}>
                    <Text> V: 12.840</Text>
                    <Text> C: 0</Text>
                    <Text> L: 0</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
          />

        </ScrollView>
      </View>

    );
  }
}

const circle = {
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: 'gray',
  borderRadius: 40,
  width: 80,
  height: 80
};

const rectangle = {
  borderWidth: StyleSheet.hairlineWidth,
  width: 1,
  height: 18
};

const styles = StyleSheet.create({
  circleButton: {
    ...circle,
    margin: 10
  },
  smallRect: {
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60
  },
  basicInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointSummary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  pointButton: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointLabel: {
    color: 'white'
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  rectangleView: {
    ...rectangle,
    marginRight: 5,
    marginLeft: 1,
  },
  imageVideo: {
    width: width,
    height: 9 / 16 * width,
    marginBottom: 10
  },
  videoLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: -30
  },
  videoCounterLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  shareLayout: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: '#39cefd',
    marginLeft: width - 40,
    marginTop: 10,
  },
});

export default ProfileView;
