import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AppConfig from '../../constants/config';
/**
 * @author Hoat Ha
 * @description Live page to record and live stream
 */
class LiveRecordView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: null,
      // headerLeft: (
      //   <TouchableOpacity onPress={() => navigation.goBack(null)}>
      //     <Text style={{ marginLeft: 12, fontSize: 13 }}>Huỷ</Text>
      //   </TouchableOpacity>
      // ),
      title: 'Live Stream',
      headerTintColor: AppConfig.headerTintColor,
      headerStyle: ({
        backgroundColor: AppConfig.headerStyleColor
      })
    };
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      background: 'transparent'
    };
  }

  render() {
    return (
      <View style={[styles.container]}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LiveRecordView;
