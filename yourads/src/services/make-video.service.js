import * as API from '../utils/api';
import AppDomain from '../constants/domain';
import * as AppAuthentication from '../utils/authentication';

export async function publicBidding(obj) {

	let url = AppDomain.devAPI + AppDomain.waitingPublicBidding + '?uid=' + obj.user_id + '&type=10';

	return API.request('GET', url).then((res) => {
		// console.log('Respone request:' + JSON.stringify(res.body));
		var result = res.body;
		result.forEach(function (element) {
			element["submitPrice"] = null; // add submitPrice property for track after
		});
		return result;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});

}

export async function specifyBidding(obj) {
	let url = AppDomain.devAPI + AppDomain.waitingSpecificationBidder + '?uid=' + obj.user_id + '&type=10';

	return API.request('GET', url).then((res) => {
		//console.log('Respone request:' + JSON.stringify(res.body));
		return res.body;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function jointedProject(obj) {
	let url = AppDomain.devAPI + AppDomain.jointedProject + '?uid=' + obj.user_id + '&status=2';
	console.log('Jointed project request:' + url);
	return API.request('GET', url).then((res) => {
		console.log('Contributed project:' + JSON.stringify(res.body));
		return res.body;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function contributedProject(obj) {
	let url = AppDomain.devAPI + AppDomain.contributedProject + '?uid=' + obj.user_id + '&status=3';

	return API.request('GET', url).then((res) => {
		console.log('Contributed project:' + JSON.stringify(res.body));
		return res.body;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}