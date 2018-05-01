import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import Slider from "react-native-slider";
import AppConfig from '../../constants/config';
import * as AppAuth from '../../utils/authentication';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

const { width, height } = Dimensions.get('window');

/**
 * @author Hoat Ha
 * @description Filter view for search
 */

class AuthView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  }

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    authAction: PropTypes.shape({
      doLoginFB: PropTypes.func.isRequired,
      initGoogleSign: PropTypes.func.isRequired,
      doLoginGG: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
  }

  dimissSocialPopup() {
    this.props.navigate({ routeName: 'Tabs' });
  }

  loginFB() {
    this.props.authAction.doLoginFB().then((res) => {
      if (this.props.isLoggedIn) {
        this.props.navigate({ routeName: 'Tabs' });
      }
    });
  }

  loginGG() {
    this.props.authAction.doLoginGG().then((res) => {
      if (this.props.isLoggedIn) {
        this.props.navigate({ routeName: 'Tabs' });
      }
    });
  }

  componentWillMount() {
    AppAuth.getAuthenticationToken().then((token) => {
      console.log('current token: ', token);
      if (token !== null) {
        this.props.navigate({ routeName: 'Tabs' });
      }
    });
  }

  componentDidMount() {
    this.props.authAction.initGoogleSign();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ marginBottom: height - 180, marginLeft: width - 60 }} onPress={() => this.dimissSocialPopup()}>
          <Image source={require('../../../images/btn_popup_black.png')} resizeMode='contain' style={styles.close_button} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.loginFB()}>
          <View style={styles.fb_button}>
            <Text style={styles.text}>ĐĂNG NHẬP BẰNG FACEBOOK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[{ margin: 10, marginBottom: 20 }]} onPress={() => this.loginGG()}>
          <View style={styles.gg_button}>
            <Text style={styles.text}>ĐĂNG NHẬP BẰNG GOOGLE</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fffbfa',
  },
  close_button: {
    width: 35, height: 35
  },
  fb_button: {
    width: width - 30,
    height: 40,
    backgroundColor: '#3b5998',
    borderRadius: 3,
  },
  gg_button: {
    width: width - 30,
    height: 40,
    backgroundColor: '#d62d20',
    borderRadius: 3,
  },
  text: {
    margin: 12,
    color: 'white',
    textAlign: 'center'
  }
});

export default AuthView;
