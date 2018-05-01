import { Map, fromJS } from 'immutable';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import * as AuthService from '../../services/auth.service';
import * as AppAuth from '../../utils/authentication';
import { GoogleSignin } from 'react-native-google-signin';

// Initial state
const initialState = Map({
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null
});

// Actions
const USER_LOGIN_SUCCESS = 'AUTH/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AUTH/USER_LOGIN_ERROR';
const INITIAL_AUTH_GOOGLE = 'AUTH/INITIAL_AUTH_GOOGLE';

export function doLoginGG() {
  return dispatch => new Promise((resolve, reject) => {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        let params = {
          type: 'google',
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.photo,
        };
        // call Authen service to register FB Profile
        AuthService.register(params).then((profile) => {

          if (profile.success === true) {
            console.log('Success register: ', profile);
            var newProfile = params;
            newProfile.name = profile.name;
            // save token to local db
            AppAuth.setAuthenticationToken(JSON.stringify(profile.apiToken));
            AppAuth.setAuthenticationProfile(JSON.stringify(newProfile));
            // dispatch state
            dispatch(onUserLoginSuccess(newProfile, profile.apiToken));
          } else {
            console.log('Failed register: ', profile);
            // dispatch state
            dispatch(onUserLoginError(profile));
          }

          // complete response
          resolve(profile);
        }).catch((err) => {

          dispatch(onUserLoginError(err));
          // complete response
          resolve(null);
        });
        
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
        dispatch({ type: USER_LOGIN_ERROR, playload: null });
      })
      .done();
  });
}

export async function initGoogleSign() {
  try {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
      iosClientId: '626145246153-n6khfskfqbemcvgu5dff2nq67t3tgtmu.apps.googleusercontent.com',
      offlineAccess: false
    });

    const user = await GoogleSignin.currentUserAsync();
    console.log(user);
  }
  catch (err) {
    console.log("Google signin error", err.code, err.message);
  }
  return { type: INITIAL_AUTH_GOOGLE };
}

export function doLoginFB() {

  return dispatch => new Promise((resolve, reject) => {

    LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email']).then((result) => {
      if (result.isCancelled) {
        //alert('Huỷ bỏ đăng nhập từ FB');
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            let accessToken = data.accessToken;

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
                dispatch({ type: USER_LOGIN_ERROR, playload: null });
              } else {

                let params = {
                  type: 'facebook',
                  id: result.id,
                  email: result.email,
                  name: result.name,
                  picture: result.picture.data.url,
                };
                // call Authen service to register FB Profile
                AuthService.register(params).then((profile) => {

                  if (profile.success === true) {
                    console.log('Success register: ', profile);
                    var newProfile = profile.user;
                    
                    // save token to local db
                    AppAuth.setAuthenticationToken(JSON.stringify(profile.apiToken));
                    AppAuth.setAuthenticationProfile(JSON.stringify(newProfile));
                    // dispatch state
                    dispatch(onUserLoginSuccess(newProfile, profile.apiToken));
                  } else {
                    console.log('Failed register: ', profile);
                    // dispatch state
                    dispatch(onUserLoginError(profile));
                  }

                  // complete response
                  resolve(profile);
                }).catch((err) => {

                  dispatch(onUserLoginError(err));
                  // complete response
                  resolve(null);
                });
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                parameters: {
                  fields: {
                    string: 'id,name,email,picture'
                  },
                  access_token: {
                    string: accessToken.toString()
                  }
                }
              },
              responseInfoCallback
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
      }
    }).catch((error) => {
      alert('Login fail with error: ' + error);
    });
  });

}

export function onUserLoginSuccess(profile, token) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      profile: fromJS(profile),
      token: fromJS(token)
    }
  };
}

export function onUserLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
    error: true
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return state
        .set('isLoggedIn', true)
        .set('currentUser', action.payload.profile)
        .set('authenticationToken', action.payload.token);
    case USER_LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}