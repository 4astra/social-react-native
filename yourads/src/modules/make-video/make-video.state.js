import { Map, fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import { Promise, reject } from 'bluebird';

import * as APIService from '../../services/make-video.service';
import * as PNJService from '../../services/public-newsjob.service';
import * as AppAuthentication from '../../utils/authentication';

// declare constant
const initState = fromJS({
  isSpecifyBidder: false,
  lstPublicBidder: [],
  lstSpecifyBidder: [],
  lstJointedProject: [],
  lstContributedProject: []
});

const PUBLIC_BIDDER_SUCCESS = 'MAKE_VIDEO/PUBLIC_BIDDER_SUCCESS';
const PUBLIC_BIDDER_FAILED = 'MAKE_VIDEO/PUBLIC_BIDDER_FAILED';
const SPECIFY_BIDDER_SUCCESS = 'MAKE_VIDEO/SPECIFY_BIDDER_SUCCESS';
const SPECIFY_BIDDER_FAILED = 'MAKE_VIDEO/SPECIFY_BIDDER_FAILED';
const ADD_TMP_PRICE_PUBLIC_BIDDER = 'MAKE_VIDEO/ADD_TMP_PRICE_PUBLIC_BIDDER';
const ADD_TMP_PRICE_SPECIFY_BIDDER = 'MAKE_VIDEO/ADD_TMP_PRICE_SPECIFY_BIDDER';
const BID_PRICE = 'MAKE_VIDEO/BID_PRICE';
const BID_PRICE_FAILED = 'MAKE_VIDEO/BID_PRICE_FAILED';
const CHANGE_HS_BIDDER_TYPE = 'MAKE_VIDEO/CHANGE_HS_BIDDER_TYPE';
const JOINTED_PROJECT_MAKE_VIDEO = 'MAKE_VIDEO/JOINTED_PROJECT_MAKE_VIDEO';
const CONTRIBUTED_PROJECT_MAKE_VIDEO = 'MAKE_VIDEO/CONTRIBUTED_PROJECT_MAKE_VIDEO';

export function listJointedProject() {
  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);

        APIService.jointedProject(obj).then((response) => {
          dispatch({ type: JOINTED_PROJECT_MAKE_VIDEO, payload: { data: response } });
          resolve(response);
        }).catch(error => {

          dispatch({ type: PUBLIC_BIDDER_FAILED });
          reject(error);
        });
      }
    }).catch(_ => {
      resolve([])
    });
  });
}

export function listContributedProject() {
  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);

        APIService.contributedProject(obj).then((response) => {
          dispatch({ type: CONTRIBUTED_PROJECT_MAKE_VIDEO, payload: { data: response } });
          resolve(response);
        }).catch(error => {

          dispatch({ type: PUBLIC_BIDDER_FAILED });
          reject(error);
        });
      }
    }).catch(_ => {
      resolve([])
    });

  });
}

export function changeBiddingType(isFlag) {
  return {
    type: CHANGE_HS_BIDDER_TYPE,
    payload: {
      data: isFlag,
    }
  };
}

export function publicBidding() {

  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);

        APIService.publicBidding(obj).then((response) => {
          dispatch(onPublicBiddingSuccess(response));
          resolve(response);
        }).catch(error => {

          dispatch({ type: PUBLIC_BIDDER_FAILED });
          reject(error);
        });
      }
    }).catch(_ => {
      resolve([])
    });

  });
}

function onPublicBiddingSuccess(response) {
  console.log('Respone onPublicBiddingSuccess:' + JSON.stringify(response[0]));
  return {
    type: PUBLIC_BIDDER_SUCCESS,
    payload: {
      data: response[0],
    }
  };
}

export function specifyBidding() {
  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);

        APIService.specifyBidding(obj).then((response) => {
          dispatch(onSpecifyBiddingSuccess(response));
          resolve(response);
        }).catch(error => {

          dispatch({ type: SPECIFY_BIDDER_FAILED });
          reject(error);
        });
      }
    }).catch(_ => {
      resolve([])
    });

  });
}

function onSpecifyBiddingSuccess(response) {
  //console.log('Respone:' + response);
  return {
    type: SPECIFY_BIDDER_SUCCESS,
    payload: {
      data: response[0],
    }
  };
}

// add tmp price when typing
export function addTempPriceForPublicBidder(id, value) {
  return {
    type: ADD_TMP_PRICE_PUBLIC_BIDDER,
    playload: { id: id, value: value }
  }
}

// add tmp price when typing
export function addTempPriceForSpecifyBidder(id, value) {
  return {
    type: ADD_TMP_PRICE_SPECIFY_BIDDER,
    playload: { id: id, value: value }
  }
}

function doAddTmpPrice(id, value, list) {
  if (list === null || list === undefined || list.length < 0) {
    return null;
  }
  list.forEach(function (element) {
    if (element.id == id) {
      // console.log('Submit price: ', value);
      element['submitPrice'] = value;
    }
  });
  return list;
}

function doAddTmpBid(id, value, list) {
  if (list === null || list === undefined || list.length < 0) {
    return null;
  }
  list.forEach(function (element) {
    if (element.id == id) {
      console.log('DAU THAU: ', id);
      element['dauthau'] = value;
    }
  });
  return list;
}

// bid price
export function bidPrice(projectID, price) {
  return dispatch => new Promise((resolve, reject) => {
    AppAuthentication.getAuthenticationProfile().then(profile => {
      if (profile) {
        var obj = JSON.parse(profile);
        // console.log('Param1: ', obj);
        var param = {
          userId: obj.user_id,
          projectId: projectID,
          amount: price
        };
        //param = JSON.stringify(param);
        console.log('Param: ', param);
        PNJService.bidPrice(param).then((response) => {
          console.log('Bid price res:' + response);
          dispatch({ type: BID_PRICE, playload: { id: projectID, value: price } });
          resolve(response);
        }).catch(error => {
          console.log('Error price res:' + error);
          dispatch({ type: BID_PRICE_FAILED })
          reject(error);
        });
      }
    }).catch(error => {
      // console.log('Error:' + error);
      // dispatch({ type: BID_PRICE_FAILED })
      reject(error);
    });
  });

  return { type: PUBLIC_BIDDER_FAILED };
}

/**
 * @description MakeVideStateReducer manages all state and action of making video
 * @param {*} state 
 * @param {*} action
 */
export default function MakeVideStateReducer(state = initState, action = {}) {
  switch (action.type) {
    case PUBLIC_BIDDER_SUCCESS:
      return state
        .set('lstPublicBidder', action.payload.data);
    case SPECIFY_BIDDER_SUCCESS:
      return state
        .set('lstSpecifyBidder', action.payload.data);

    case ADD_TMP_PRICE_PUBLIC_BIDDER:
      var id = action.playload.id;
      var value = action.playload.value;
      var list = state.get('lstPublicBidder');
      return state
        .set('lstPublicBidder', doAddTmpPrice(id, value, list));

    case ADD_TMP_PRICE_SPECIFY_BIDDER:
      var id = action.playload.id;
      var value = action.playload.value;
      var list = state.get('lstSpecifyBidder');
      return state
        .set('lstSpecifyBidder', doAddTmpPrice(id, value, list));

    // BID PRICE
    case BID_PRICE:
      var id = action.playload.id;
      var value = action.playload.value;
      var isSpecifyBidder = state.get('isSpecifyBidder');
      if (isSpecifyBidder) {
        var list = state.get('lstSpecifyBidder');
        return state
          .set('lstSpecifyBidder', doAddTmpBid(id, value, list));
      } else {
        var list = state.get('lstPublicBidder');
        return state
          .set('lstPublicBidder', doAddTmpBid(id, value, list));
      }


    case CHANGE_HS_BIDDER_TYPE:
      return state.set('isSpecifyBidder', action.payload.data);

    // JOINTED PROJECT
    case JOINTED_PROJECT_MAKE_VIDEO:
      return state
        .set('lstJointedProject', action.payload.data);

    case CONTRIBUTED_PROJECT_MAKE_VIDEO:
      return state
        .set('lstContributedProject', action.payload.data);

    default:
      return state;
  }
}