import React, { Component, PropTypes } from 'react';
import {
  Animated,
  View,
  Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class progressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnailOpacity: new Animated.Value(0)
    }
  }

  onLoad() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 0,
      duration: 250
    }).start()
  }

  onThumbnailLoad() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250
    }).start();
  }

  render() {
    return (
      <View
        width={this.props.style.width}
        height={this.props.style.height}
        backgroundColor={'#ffffff'}
      >
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            {
              position: 'absolute'
            },
            this.props.style
          ]}
          source={this.props.source}
          onLoad={(event) => this.onLoad(event)}
        />
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            {
              opacity: this.state.thumbnailOpacity
            },
            this.props.style
          ]}
          source={this.props.thumbnail}
          onLoad={(event) => this.onThumbnailLoad(event)}
        />
      </View>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  ß
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(progressiveImage);