import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import AppConfig from '../../constants/config';
import rows from './data';
import styles from './styles';

/**
 * @author Hoat Ha
 * @description Notification page received Push Notification
 */
class NotificationView extends Component {

  static navigationOptions = {
    title: 'Notification',
    headerTintColor: AppConfig.headerTintColor,
    headerStyle: {
      backgroundColor: AppConfig.headerStyleColor
    },
    headerLeft: null
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: rows,
    };
  }
  
  render() {
    return (
      <View style={[styles.container, { backgroundColor: 'white'}]}>
        <FlatList style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
          data={this.state.dataSource}
          renderItem={({ item, separators }) => (
            <TouchableOpacity>
              <View style={styles.li} >
                <Text style={styles.liText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default NotificationView;