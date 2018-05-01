import AppDomain from '../constants/domain';
import * as API from '../utils/api';

export async function doneBuyVideo(obj) {
	let url = AppDomain.devAPI + AppDomain.buyVideo + '?userid=' + obj.user_id + '&status=3';//+ '?userid=' + '404&status=3';
  
  //console.log("Buy video request: " + url);

	return API.request('GET', url).then((res) => {
		//console.log('Buy video response:' + res.body.data);
		return res.body.data;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function doingBuyVideo(obj) {
	let url = AppDomain.devAPI + AppDomain.buyVideo + '?userid=' + obj.user_id + '&status=2'; //'?userid=' + '404&status=2';
  
  // console.log("Buy video request: " + url);

	return API.request('GET', url).then((res) => {
		// console.log('Buy video response:' + res.body.data);
		return res.body.data;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function createdBuyVideo(obj) {
	let url = AppDomain.devAPI + AppDomain.buyVideo + '?userid=' + '404' + '&status=1';//'?userid=' + '404&status=1'; //obj.user_id
  
  console.log("Buy video request: " + url);

	return API.request('GET', url).then((res) => {
		console.log('Buy video response:' + res.body.data);
		return res.body.data;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}

export async function closeProject(param) {
	let url = AppDomain.devAPI + AppDomain.closeProject;
  
  console.log("Close project request: " + url);

	return API.request('POST', url, param).then((res) => {
		console.log('Close project response:' + res.body.data);
		return res.body.data;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}