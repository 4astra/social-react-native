import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

import * as AppFormatter from '../../utils/formatter';
import AppConfig from '../../constants/config';

// declare constant 
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class DoingBuyVideoView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    lstDoingBuyVideo: PropTypes.any,
    actions: PropTypes.shape({
      listDoingBuyVideo: PropTypes.func.isRequired,
      doCloseProject: PropTypes.func.isRequired
    }),
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.listDoingBuyVideo();
  }

  closeProject(item) {
    console.log('Close project: ' + JSON.stringify(item));
    this.props.actions.doCloseProject(item).then(res => {
      this.props.actions.listDoingBuyVideo();
    });
  }

  renderMainContent() {
    if (this.props.lstDoingBuyVideo.length > 0) {
      return (
        <FlatList style={{ marginLeft: 0, marginTop: 0, marginBottom: 15 }}
          data={this.props.lstDoingBuyVideo}
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
                <Text>  Nội dung yêu cầu: {item.content} </Text>
              </View>
              <View style={styles.contract}>
                <Text>  Hợp tác với: </Text>
                <Image style={styles.circle} source={{ uri: item.provider.avatar_url }} />
                <Text> {item.provider.fullName}</Text>
              </View>
              <View style={styles.completeButton}>
                <TouchableOpacity style={{ backgroundColor: '#F2F2F2', }}
                  onPress={() => this.closeProject(item)}>
                  <Text style={styles.completeText}>Hoàn thành</Text>
                </TouchableOpacity>
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
    //console.log('Buy video: ' + this.props.lstDoingBuyVideo);
    return (
      <View style={styles.container}>
        {
          this.renderMainContent()
        }
      </View>
    );
  }
}

export default DoingBuyVideoView;

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
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.0,
    borderColor: 'white'
  },
  contract: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#F2F2F2',
    borderColor: '#F2F2F2',
    borderRadius: 3
  },
  completeButton: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: -35, marginRight: 15,
  },
  completeText: {
    color: AppConfig.headerStyleColor,
    borderColor: AppConfig.headerStyleColor,
    borderWidth: 1.0,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 2
  }

});
