import * as API from '../utils/api';
import AppDomain from '../constants/domain';

/**
 * @author Hoat Ha
 * @desc Home Services
 */

export async function topProviders() {
	let url = AppDomain.devAPI + AppDomain.topProviders;

	return API.request('GET', url).then((res) => {
		console.log('Respone:' + JSON.stringify(res));
		return res.body.data.ls;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function topContractors() {
	let url = AppDomain.devAPI + AppDomain.latestContractors;

	return API.request('GET', url).then((res) => {
		console.log('Respone:' + JSON.stringify(res));
		return res.body.data.ls;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function topBuyers() {
	let url = AppDomain.devAPI + AppDomain.lastestBuyers;

	return API.request('GET', url).then((res) => {
		console.log('Respone:' + JSON.stringify(res));
		return res.body.data.ls;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function videosTemplate(page_number, page_size) {
	let url = AppDomain.devAPI + AppDomain.videosTemplate + 'page_number=' + page_number + '&' + 'page_size=' + page_size;

	return API.request('GET', url).then((res) => {
		console.log('Respone:' + JSON.stringify(res));
		return res.body.data.ls;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}