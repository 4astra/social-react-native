import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';

import * as AppFormatter from '../../utils/formatter';
import AppConfig from '../../constants/config';

// declare constant 
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class CreatedBuyVideoView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    lstCreatedBuyVideo: PropTypes.any,
    actions: PropTypes.shape({
      listCreatedBuyVideo: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.listCreatedBuyVideo();
  }

  renderMainContent() {
    if (this.props.lstCreatedBuyVideo.length > 0) {
      return (
        <FlatList style={{ marginLeft: 0, marginTop: 0, marginBottom: 15 }}
          data={this.props.lstCreatedBuyVideo}
          renderItem={({ item, separators }) => (
            <View style={{ flexDirection: 'column', margin: 5, borderColor: '#EFEFF4', borderWidth: 1.0, borderRadius: 3.0 }}>
              <View style={{ flexDirection: 'column', marginTop: 5, }}>
                <Text style={styles.boldText}>  {item.name} [{item.id}] </Text>
                <Text>  Loại hợp đồng: {item.contractTypes[0].name} </Text>
                <Text>  Loại cảm xúc: {item.emotions[0].name} </Text>
                <Text>  Loại ngành nghề: {item.productTypes[0].name} </Text>
                <Text>  Loại video: {item.videoDurations[0].name} </Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text>  Giá: </Text>
                  <Text style={styles.numbers}>{AppFormatter.currency(item.price != null ? item.price : 0)} </Text>
                </View>
                <Text>  Thời gian cần: {item.expected_date} </Text>
                <Text style={{ marginBottom: 5 }}>  Nội dung yêu cầu: {item.content} </Text>
                <View style={styles.footer}>
                  <TouchableOpacity>
                    <Text style={{ marginLeft: 5, color: 'white', fontWeight: 'bold' }}>Lịch sử đấu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{ marginRight: 5, color: 'white', fontWeight: 'bold' }}>Sửa dự án</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      );
    } else {
      return (
        <View style={styles.noData}>
          <Text>Không có dữ liệu</Text>
        </View>
      );
    }
  }

  render() {
    //console.log('Buy video: ' + this.props.lstCreatedBuyVideo);
    return (
      <View style={styles.container}>
        {
          this.renderMainContent()
        }
      </View>
    );
  }
}

export default CreatedBuyVideoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numbers: {
    color: AppConfig.numberColor,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppConfig.numberColor,
    height: 30,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderColor: AppConfig.numberColor
  }
});
