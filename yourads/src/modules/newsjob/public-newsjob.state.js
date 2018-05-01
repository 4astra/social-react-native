import { Map, fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import * as PNJService from '../../services/public-newsjob.service';
import { Promise, reject } from 'bluebird';
import { request } from '../../utils/api';
import * as AppAuthentication from '../../utils/authentication';

/**
 * @author Hoat Ha
 * @description PublicNewsJobStateReducer class
 */

// Initial state
const initialState = fromJS({
  loading: false,
  list: [],
  isFilter: false,
  filterResult: [],
  keyword: null,
  filters: {
    distance: {
      value: 1000000,
      step: 1,
      min: 0,
      max: 1000000
    },
    price: {
      from: '0',
      to: '1000000',
    },
    emotion: [{ isSelect: false, name: 'Vui vẻ', id: 1 }, { isSelect: false, name: 'Truyền thống', id: 2 }],
    job: [{ isSelect: false, name: 'Bánh kẹo', id: 1 }, { isSelect: false, name: 'Điện thoại', id: 2 }, { isSelect: false, name: 'Thời trang', id: 3 }],
    video: [{ isSelect: false, name: '60s', id: 1 }, { isSelect: false, name: '90s', id: 2 }],
  },
});

function defaultFilters() {
  return fromJS({
    distance: {
      value: 1000000,
      step: 1,
      min: 0,
      max: 1000000
    },
    price: {
      from: '0',
      to: '1000000',
    },
    emotion: [{ isSelect: false, name: 'Vui vẻ', id: 1 }, { isSelect: false, name: 'Truyền thống', id: 2 }],
    job: [{ isSelect: false, name: 'Bánh kẹo', id: 1 }, { isSelect: false, name: 'Điện thoại', id: 2 }, { isSelect: false, name: 'Thời trang', id: 3 }],
    video: [{ isSelect: false, name: '60s', id: 1 }, { isSelect: false, name: '90s', id: 2 }],
  });
}

// Actions
const REQ_PUBLIC_NEWS_JOB = 'PublicNewsJobState/GET';
const RES_PUBLIC_NEWS_JOB = 'PublicNewsJobState/RESPONSE';
const RES_PUBLIC_NEWS_JOB_FAILED = 'PublicNewsJobState/RESPONSE_FAILED';
const REQ_FILTER_KEYWORD = 'PublicNewsJobState/REQ_FILTER_KEYWORD';
const RESET_FILTER_KEYWORD = 'PublicNewsJobState/RESET_FILTER_KEYWORD';
const PUT_FILTER_DISTANCE = 'PublicNewsJobState/PUT_FILTER_DISTANCE';
const PUT_FILTER_PRICE_FROM = 'PublicNewsJobState/PUT_FILTER_PRICE_FROM';
const PUT_FILTER_PRICE_TO = 'PublicNewsJobState/PUT_FILTER_PRICE_TO';
const PUT_FILTER_EMOTION = 'PublicNewsJobState/PUT_FILTER_EMOTION';
const PUT_FILTER_JOB = 'PublicNewsJobState/PUT_FILTER_JOB';
const PUT_FILTER_VIDEO = 'PublicNewsJobState/PUT_FILTER_VIDEO';
const REQ_FILTER_CATEGORY = 'PublicNewsJobState/REQ_FILTER_CATEGORY';
const RESET_FILTER_CATEGORY = 'PublicNewsJobState/RESET_FILTER_CATEGORY';
const ADD_TMP_PRICE = 'PublicNewsJobState/ADD_TMP_PRICE';
const BID_PRICE = 'PublicNewsJobState/BID_PRICE';

// Action creators
export function list() {

  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      
      var obj = JSON.parse(profile);
      PNJService.list(obj).then(
        (result) => {
          dispatch({ type: RES_PUBLIC_NEWS_JOB, playload: result });
          resolve(profile);
        }).catch((err) => {
          dispatch({ type: RES_PUBLIC_NEWS_JOB_FAILED });
          resolve([]);
        });;

    }).catch(_ => {
      dispatch({ type: RES_PUBLIC_NEWS_JOB_FAILED });
      resolve([]);
    });

  });
}

// do filter
export function filterKeyword(akeyword) {
  var data = initialState.get('list');
  return {
    type: REQ_FILTER_KEYWORD,
    playload: akeyword
  }
}

// do reset
export function resetFilterKeyword() {
  return {
    type: RESET_FILTER_KEYWORD,
  }
}

// change distance
export function putDistance(aValue) {
  return {
    type: PUT_FILTER_DISTANCE,
    playload: aValue
  }
}

// change price
export function putPriceFrom(aValue) {
  return {
    type: PUT_FILTER_PRICE_FROM,
    playload: aValue
  }
}
export function putPriceTo(aValue) {
  return {
    type: PUT_FILTER_PRICE_TO,
    playload: aValue
  }
}

// change emotion
export function putEmotion(aValue) {
  return {
    type: PUT_FILTER_EMOTION,
    playload: aValue
  }
}

// change job
export function putJob(aValue) {
  return {
    type: PUT_FILTER_JOB,
    playload: aValue
  }
}

// change video
export function putVideo(aValue) {
  return {
    type: PUT_FILTER_VIDEO,
    playload: aValue
  }
}

// filter category 
export function filterCategory() {
  return {
    type: REQ_FILTER_CATEGORY
  }
}

// filter is reset 
export function resetFilterCategory() {
  return {
    type: RESET_FILTER_CATEGORY,
  }
}

// add tmp price when typing
export function addTempPrice(id, value) {
  return {
    type: ADD_TMP_PRICE,
    playload: { id: id, value: value }
  }
}

// bid price
export function bidPrice(id, price) {
  console.log('Begin bid price for: ' + id + ', amount: ' + price);

  return dispatch => new Promise((resolve, reject) => {

    AppAuthentication.getAuthenticationProfile().then(profile => {
      var obj = JSON.parse(profile);
      
      var param = {
        userId: obj.user_id,
        projectId: id,
        amount: price
      };

      PNJService.bidPrice(param).then((response) => {
        dispatch({ type: BID_PRICE, playload: null });
        resolve(response);
      });
    });

    
  });
}

// -----------------do actions-------------------------

function doFilter(keyword, state) {

  var results = state.get('list');

  if (results == null || results == undefined || results.length <= 0) {
    return [];
  }

  var key = keyword;
  if (key === undefined || key === null) {
    key = '';
  } else {
    key = key.toLowerCase().trim();
  }

  if (key !== '') {
    results = results.filter((item) => item.name.toLowerCase().indexOf(key) !== -1);
  }

  // filter following emotion
  var followingEmotions = getSelectedCategory(state.getIn(['filters', 'emotion']));
  if (followingEmotions.length > 0) {
    results = results.filter(
      (item) => {
        var tmp = item.emotions.length > 0 ? item.emotions[0] : null;
        if (tmp != null) {
          return tmp.name.toLowerCase().indexOf(followingEmotions[0].get('name').toLowerCase()) !== -1;
        }
      }
    )
  }

  // filter following job
  var followingJob = getSelectedCategory(state.getIn(['filters', 'job']));
  if (followingJob.length > 0) {
    results = results.filter(
      (item) => {
        var tmp = item.productTypes.length > 0 ? item.productTypes[0] : null;
        if (tmp != null) {
          return tmp.name.toLowerCase().indexOf(followingJob[0].get('name').toLowerCase()) !== -1;
        }

      }
    )
  }

  // filter following video
  var followingVideo = getSelectedCategory(state.getIn(['filters', 'video']));
  if (followingVideo.length > 0) {
    results = results.filter(
      (item) => {
        var tmp = item.videoDurations.length > 0 ? item.videoDurations[0] : null;
        if (tmp != null) {
          return tmp.name.toLowerCase().indexOf(followingVideo[0].get('name').toLowerCase()) !== -1;
        }

      }
    )
  }

  // filter price
  var priceFrom = state.getIn(['filters', 'price', 'from']);
  priceFrom = parseInt(priceFrom);
  var priceTo = state.getIn(['filters', 'price', 'to']);
  priceTo = parseInt(priceTo);

  if (!isNaN(priceFrom) && !isNaN(priceTo)) {
    priceFrom = priceFrom * 1000;
    priceTo = priceTo * 1000;
    results = results.filter(
      (item) => {
        var price = parseInt(item.price);
        console.log('Price: ', price);
        if (!isNaN(price) && price >= priceFrom && price <= priceTo) {
          return item;
        }
      }
    )
  }

  // filter distance
  var distance = state.getIn(['filters', 'distance', 'value']);
  distance = parseFloat(distance);

  if (!isNaN(distance)) {
    results = results.filter(
      (item) => {
        var userDistance = parseFloat(item.user.distance);
        console.log('Distance: ', userDistance);
        return !isNaN(userDistance) && userDistance <= distance;
      }
    );
  }
  return results;
}

// Get selected category has 'isSelect' equals true
function getSelectedCategory(category) {
  if (category == null || category == undefined || category.length <= 0) {
    return [];
  }

  return category.filter((item) => item.get('isSelect') === true).toArray();
}

// highlight categories are selected
function doSelectFilterCategory(item, category) {
  return category.map(function (val, index) {
    var tmp = val.toObject();
    return (index + 1 == item.id) ? fromJS({ id: item.id, isSelect: !item.isSelect, name: item.name }) : fromJS({ id: tmp.id, isSelect: false, name: tmp.name })
  });
}

// add tmp price
function doAddTmpPrice(id, value, list) {
  if (list === null || list === undefined || list.length < 0) {
    return null;
  }
  list.forEach(function (element) {
    if (element.id == id) {
      console.log('Submit price: ', value);
      element['submitPrice'] = value;
    }
  });
  return list;
}

/**
 * @description PublicNewsJobStateReducer manages all state and action of public News Job, Filter
 * @param {*} state 
 * @param {*} action 
 */
export default function PublicNewsJobStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQ_PUBLIC_NEWS_JOB:
      return loop(
        state.set('loading', true),
        Effects.promise(doGetList)
      );

    case RES_PUBLIC_NEWS_JOB:
      return state
        .set('loading', false)
        .set('list', action.playload);

    case REQ_FILTER_KEYWORD:
      var key = action.playload;
      return state
        .set('keyword', key)
        .set('isFilter', true)
        .set('filterResult', doFilter(key, state));

    case REQ_FILTER_CATEGORY:
      var key = state.get('keyword');
      return state
        .set('isFilter', true)
        .set('filterResult', doFilter(key, state));

    // RESET  
    case RESET_FILTER_KEYWORD:
      return state
        .set('keyword', null)
        .set('isFilter', false)
        .set('filterResult', null);

    case RESET_FILTER_CATEGORY:
      return state
        .set('filters', defaultFilters());

    // PUT, CHANGE  
    case PUT_FILTER_DISTANCE:
      return state
        .setIn(['filters', 'distance', 'value'], action.playload);

    case PUT_FILTER_PRICE_FROM:
      return state
        .setIn(['filters', 'price', 'from'], action.playload);

    case PUT_FILTER_PRICE_TO:
      return state
        .setIn(['filters', 'price', 'to'], action.playload);

    case PUT_FILTER_EMOTION:
      var data = state.getIn(['filters', 'emotion']);
      return state
        .setIn(['filters', 'emotion'], doSelectFilterCategory(action.playload, data));

    case PUT_FILTER_JOB:
      var data = state.getIn(['filters', 'job']);
      return state
        .setIn(['filters', 'job'], doSelectFilterCategory(action.playload, data));

    case PUT_FILTER_VIDEO:
      var data = state.getIn(['filters', 'video']);
      return state
        .setIn(['filters', 'video'], doSelectFilterCategory(action.playload, data));

    // PRICE
    case ADD_TMP_PRICE:
      var id = action.playload.id;
      var value = action.playload.value;
      var list = state.get('list');
      return state
        .setIn('list', doAddTmpPrice(id, value, list));

    // BID PRICE
    case BID_PRICE:
      return state;

    default:
      return state;
  }
}