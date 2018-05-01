
import { Map, fromJS } from 'immutable';
import * as HomeService from '../../services/home.service';
import * as AppAuth from '../../utils/authentication';

// Initial state
const initialState = fromJS({
	topProviders: null,
	topContractors: null,
	topBuyers: null,
	videosTemplate: null
});

// Actions
const TOP_PROVIDERS_SUCCESS = 'HOME/TOP_PROVIDERS_SUCCESS';
const TOP_PROVIDERS_ERROR = 'HOME/TOP_PROVIDERS_ERROR';
const TOP_CONTRACTORS_SUCCESS = 'HOME/TOP_CONTRACTORS_SUCCESS';
const TOP_CONTRACTORS_ERROR = 'HOME/TOP_CONTRACTORS_ERROR';
const TOP_BUYERS_SUCCESS = 'HOME/TOP_BUYERS_SUCCESS';
const TOP_BUYERS_ERROR = 'HOME/TOP_BUYERS_ERROR';
const TOP_VIDEOSTEMPLATE_SUCCESS = 'HOME/TOP_VIDEOSTEMPLATE_SUCCESS';
const TOP_VIDEOSTEMPLATE_ERROR = 'HOME/TOP_VIDEOSTEMPLATE_ERROR';

export function videosTemplate() {

	return dispatch => new Promise((resolve, reject) => {
		HomeService.videosTemplate(0, 100).then((res) => {
			console.log('Top Providers: ' + res);
			dispatch({ type: TOP_VIDEOSTEMPLATE_SUCCESS, payload: res });
			resolve(res);
		}).catch((err) => {
			dispatch({ type: TOP_VIDEOSTEMPLATE_ERROR, payload: err });
			reject(err);
		});
	});

}

export function topProviders() {

	return dispatch => new Promise((resolve, reject) => {
		HomeService.topProviders().then((res) => {
			console.log('Top Providers: ' + res);
			dispatch({ type: TOP_PROVIDERS_SUCCESS, payload: res });
			resolve(res);
		}).catch((err) => {
			dispatch({ type: TOP_PROVIDERS_ERROR, payload: err });
			reject(err);
		});
	});

}

export function topContractors() {

	return dispatch => new Promise((resolve, reject) => {
		HomeService.topContractors().then((res) => {
			console.log('Top Contractors: ' + res);
			dispatch({ type: TOP_CONTRACTORS_SUCCESS, payload: res });
			resolve(res);
		}).catch((err) => {
			dispatch({ type: TOP_CONTRACTORS_ERROR, payload: err });
			reject(err);
		});
	});

}

export function topBuyers() {

	return dispatch => new Promise((resolve, reject) => {
		HomeService.topBuyers().then((res) => {
			console.log('Top Buyers: ' + res);
			dispatch({ type: TOP_BUYERS_SUCCESS, payload: res });
			resolve(res);
		}).catch((err) => {
			dispatch({ type: TOP_BUYERS_ERROR, payload: err });
			reject(err);
		});
	});

}


// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
	switch (action.type) {
		case TOP_PROVIDERS_SUCCESS:
			return state
				.set('topProviders', action.payload);
		case TOP_CONTRACTORS_SUCCESS:
			return state
				.set('topContractors', action.payload);
		case TOP_BUYERS_SUCCESS:
			return state
				.set('topBuyers', action.payload);
		case TOP_VIDEOSTEMPLATE_SUCCESS:
			return state
				.set('videosTemplate', action.payload);
		default:
			return state;
	}
}