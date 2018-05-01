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
import { CameraKitCameraScreen } from 'react-native-camera-kit';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/**
 * @author Hoat Ha
 * @description BuyVideo View
 */
class CameraCaptureBuyVideoView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    lstCamera360: PropTypes.any,
    isCaptureContinue: PropTypes.bool,
    numCaptureCurrentCamera: PropTypes.number,
    // actions
    actions: PropTypes.shape({
      initListCamera360: PropTypes.func.isRequired,
      changeCaptureType: PropTypes.func.isRequired,
      changeCaptureCameraNum: PropTypes.func.isRequired,
    }),
  };

  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    Alert.alert(
      `${event.type} button pressed`,
      `${captureImages}`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }

  dimiss() {
    //this.props.navigate({type: "Navigation/BACK", key: null});
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: 'black' }]}>
        <View style={{ backgroundColor: 'black' }}>

          <CameraKitCameraScreen style={{ width: width, height: height, marginTop: 0 }}
            onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            captureButtonImage={require('../../../images/cameraButton.png')}
          />

          <TouchableOpacity style={{ marginLeft: width - 50, marginTop: -(height - 35), height: 50, width: 80 }} onPress={() => { this.dimiss() }}>
            <Text
              style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default CameraCaptureBuyVideoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});