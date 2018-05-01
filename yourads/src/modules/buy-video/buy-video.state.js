import { Map, fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import { Promise, reject } from 'bluebird';

import * as AppAuthentication from '../../utils/authentication';
import * as BuyVideoService from '../../services/buy-video.service';

// declare constant
const initState = fromJS({
  lstCreatedBuyVideo: [],
  lstDoingBuyVideo: [],
  lstDoneBuyVideo: [],
  lstCamera360: [],
  isCaptureContinue: true,
  numCaptureCurrentCamera: -1,
  project: {
    "id": 218,
    "name": "sk20",
    "contract_type": "10",
    "content": "sk20",
    "price": 2000000,
    "price_type": "10",
    "payment_method": "",
    "product_type": "10",
    "video_duration": "20",
    "expected_date": "2018-02-05",
    "finished_date": null,
    "emotion": "10", "ban_id": 423,
    "provider":
      { "user_id": 423, "login_id": "0000000002", "userName": "Akira Phan", "userType": 0, "userStatus": 2, "adminRole": 0, "fullName": "Akira Phan", "gender": null, "email": null, "mobile": "0000000002", "avatar": "1", "banner": "3", "avatar_url": "http://live.yourtv.vn/user-avatar/2017/0725/channel/39.jpg", "cover_url": "http://live.yourtv.vn/cover/default.jpg", "channel_yn": "Y", "dateOfBirth": null, "expiredDate": null, "viewCount": 0, "shareCount": 0, "startMoney": 0, "channelId": 39, "lastLogin": "2017-06-12T08:23:34.000Z", "hasPayment": "1", "gg_avatar": null, "fbName": null, "statusMsg": null, "dateCreated": "2017-02-24 08:54:55", "universityName": null, "ten_khoa": null, "ten_lop": null, "thi_approve_status": 0, "idCard": 0, "address": null, "JobTitle": null, "v1_subscriber_pk": 319301, "total_like": 1, "total_video": 75, "total_follow": 4, "longitude": 105.681335, "latitude": 18.679585, "activeToken": null }
  },
  picture: [
    { "id": 1218, "name": "1519790428162.jpeg", "file_path": "/ytvserver/www/yourads.vn/tmp/uploads/project_files/2018/2/28/1519803867347.jpeg", "ord": 3 },
    { "id": 1219, "name": "1519790428164.jpeg", "file_path": "D:\\yads\\yourads.vn\\tmp\\uploads\\project_files\\2018\\2\\28/1519790454995.jpeg", "ord": 5 },
    { "id": 1220, "name": "1519790428163.jpeg", "file_path": "D:\\yads\\yourads.vn\\tmp\\uploads\\project_files\\2018\\2\\28/1519790454998.png", "ord": 4 },
    { "id": 1216, "name": "1519790317664.png", "file_path": "D:\\yads\\yourads.vn\\tmp\\uploads\\project_files\\2018\\2\\28/1519790317664.png", "ord": 2 },
    { "id": 1217, "name": "1519790317659.jpeg", "file_path": "D:\\yads\\yourads.vn\\tmp\\uploads\\project_files\\2018\\2\\28/1519790317659.jpeg", "ord": 1 },
    { "id": 1215, "name": "1519728054325.jpeg", "file_path": "D:\\yads\\yourads.vn\\tmp\\uploads\\project_files\\2018\\2\\28/1519790194142.jpeg", "ord": 0 }
  ],
  commonCodes: {
    "categories":
      [{ "parent_code": "categories", "code": "10", "name": "60s", "name_en": "60s" }, { "parent_code": "categories", "code": "20", "name": "90s", "name_en": "90s" }],
    "contracts":
      [{ "parent_code": "contracts", "code": "10", "name": "Hợp đồng liên kết", "name_en": "Associate contract" }, { "parent_code": "contracts", "code": "20", "name": "Streaming", "name_en": "Streaming" }],
    "emotions":
      [{ "parent_code": "emotions", "code": "10", "name": "Vui vẻ", "name_en": "Joy" }, { "parent_code": "emotions", "code": "20", "name": "Cổ trang", "name_en": "Historical drama" }],
    "payments": [{ "parent_code": "payments", "code": "10", "name": "Banking charging", "name_en": "Banking charging" }], "prices": [{ "parent_code": "prices", "code": "10", "name": "Chỉ định thầu", "name_en": "Private bidding" }, { "parent_code": "prices", "code": "20", "name": "Đấu thầu công khai", "name_en": "Public bidding" }],
    "products": [{ "parent_code": "products", "code": "10", "name": "Bánh kẹo", "name_en": "Candy" }, { "parent_code": "products", "code": "20", "name": "Điện thoại", "name_en": "Phone" }, { "parent_code": "products", "code": "30", "name": "Thời trang", "name_en": "Fashion" }]
  }

});

const INIT_LIST_CAMERA360 = 'BUY_VIDEO/INIT_LIST_CAMERA360';
const CREATED_BUY_VIDEO_SUCCESS = 'BUY_VIDEO/CREATED_BUY_VIDEO_SUCCESS';
const CREATED_BUY_VIDEO_FAIL = 'BUY_VIDEO/CREATED_BUY_VIDEO_FAIL';
const DONE_BUY_VIDEO_SUCCESS = 'BUY_VIDEO/DONE_BUY_VIDEO_SUCCESS';
const DONE_BUY_VIDEO_FAIL = 'BUY_VIDEO/DONE_BUY_VIDEO_FAIL';
const DOING_BUY_VIDEO_SUCCESS = 'BUY_VIDEO/DOING_BUY_VIDEO_SUCCESS';
const DOING_BUY_VIDEO_FAIL = 'BUY_VIDEO/DOING_BUY_VIDEO_FAIL';
const CLOSE_PROJECT_SUCCESS = 'BUY_VIDEO/CLOSE_PROJECT_SUCCESS';
const CLOSE_PROJECT_FAIL = 'BUY_VIDEO/CLOSE_PROJECT_FAIL';
const CAPTURE_MODE = 'BUY_VIDEO/CAPTURE_MODE';
const CAPTURE_CURRENT_CAMERA = 'BUY_VIDEO/CAPTURE_CURRENT_CAMERA';

export function changeCaptureType(flag) {
  return { type: CAPTURE_MODE, payload: { data: flag } };
}

export function changeCaptureCameraNum(num) {
  return { type: CAPTURE_CURRENT_CAMERA, payload: { data: num } };
}

export function initListCamera360() {
  var tmp = [];
  for (var i = 1; i <= 52; i++) {
    tmp.push({ id: i, data: null, name: 'my name' + i, placeholder: '../../../images/solid_camera.png' });
  }
  return { type: INIT_LIST_CAMERA360, payload: { data: tmp } };
}

export function listCreatedBuyVideo() {

  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);

        BuyVideoService.createdBuyVideo(obj).then(response => {
          dispatch(onCreatedBuyVideoSuccess(response));
          resolve(response);
        }).catch(error => {
          dispatch({ type: CREATED_BUY_VIDEO_FAIL })
          reject(error);
        });
      }
    }).catch(_ => {
      resolve([])
    });

  });
}

function onCreatedBuyVideoSuccess(response) {
  console.log('Respone onCreatedBuyVideoSuccess:' + JSON.stringify(response));
  return {
    type: CREATED_BUY_VIDEO_SUCCESS,
    payload: {
      data: response,
    }
  };
}

export function listDoingBuyVideo() {

  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);

        BuyVideoService.doingBuyVideo(obj).then(response => {
          dispatch(onDoingBuyVideoSuccess(response));
          resolve(response);
        }).catch(error => {
          dispatch({ type: DOING_BUY_VIDEO_FAIL })
          reject(error);
        });
      }
    }).catch(_ => {
      resolve([])
    });

  });
}

function onDoingBuyVideoSuccess(response) {
  console.log('Respone onDoingBuyVideoSuccess:' + JSON.stringify(response));
  // data test 
  // var arr = [];
  // arr.push(response[0]);
  // arr.push(response[0]);
  return {
    type: DOING_BUY_VIDEO_SUCCESS,
    payload: {
      data: response,
    }
  };
}

export function listDoneBuyVideo() {
  return dispatch => new Promise((resolve, reject) => {
    AppAuthentication.getAuthenticationProfile().then(profile => {

      if (profile) {
        var obj = JSON.parse(profile);
        BuyVideoService.doneBuyVideo(obj).then(response => {
          dispatch(onDoneBuyVideoSuccess(response));
          resolve(response);
        }).catch(error => {
          dispatch({ type: DONE_BUY_VIDEO_FAIL })
          reject(error);
        });
      }

    });

  });
}

function onDoneBuyVideoSuccess(response) {
  console.log('Respone onDoneBuyVideoSuccess:' + JSON.stringify(response));
  return {
    type: DONE_BUY_VIDEO_SUCCESS,
    payload: {
      data: response,
    }
  };
}

export function doCloseProject(project) {
  return dispatch => new Promise((resolve, reject) => {
    AppAuthentication.getAuthenticationProfile().then(profile => {

      if (profile) {
        var obj = JSON.parse(profile);
        var param = {
          userId: obj.user_id,
          projectId: project.id
        };

        BuyVideoService.closeProject(param).then(response => {
          dispatch({ type: CLOSE_PROJECT_SUCCESS });
          resolve(response);
        }).catch(error => {
          dispatch({ type: CLOSE_PROJECT_FAIL })
          reject(error);
        });
      }

    });

  });
}

/**
 * @description BuyVideoStateReducer manages all state and action of buy video
 * @param {*} state 
 * @param {*} action
 */
export default function BuyVideoStateReducer(state = initState, action = {}) {
  switch (action.type) {
    case DONE_BUY_VIDEO_SUCCESS:
      return state.set('lstDoneBuyVideo', action.payload.data);
    case DOING_BUY_VIDEO_SUCCESS:
      return state.set('lstDoingBuyVideo', action.payload.data);
    case CREATED_BUY_VIDEO_SUCCESS:
      return state.set('lstCreatedBuyVideo', action.payload.data);
    case INIT_LIST_CAMERA360:
      return state.set('lstCamera360', action.payload.data);
    case CAPTURE_MODE:
      return state.set('isCaptureContinue', action.payload.data);
    case CAPTURE_CURRENT_CAMERA:
      return state.set('isCaptureContinue', false)
        .set('numCaptureCurrentCamera', action.payload.data);

    default:
      return state;
  }
}