import * as API from '../utils/api';
import * as AppLocation from '../utils/location';
import AppDomain from '../constants/domain';

/**
 * @author Hoat Ha
 * @desc News Job Services
 */
export async function list(obj) {

	// get current location
	var location = await AppLocation.getLocationInfo();
	location = JSON.parse(location);

	if (location === null || location === undefined) {
		location = AppLocation.defaultLoc();
	}
	let long = location.coords.longitude;
	let lat = location.coords.latitude;
	console.log('Long: ' + long);
	console.log('Lat: ' + lat);

	
	let url = AppDomain.devAPI + AppDomain.listNewsJobFromLocation + '?lat='
		+ location.coords.latitude + '&lng=' + location.coords.longitude + '&ban_id=' + obj.user_id; //hardcode: 123
	
	console.log('Request: ', url);

	return API.request(
		'GET',
		url
	).then((stuff) => {
		console.log('Response: ', stuff);
		var result = stuff.body.data;
		result.forEach(function (element) {
			element["submitPrice"] = null; // add submitPrice property for track after
		});
		return result;
	}).catch((error) => {
		console.log('Error of News Job: ' + error);
	});
}

export async function bidPrice(param) {
	let url = AppDomain.devAPI + AppDomain.bidJobPrice;
	console.log('Request bid: ', url);
	return API.request(
		'POST',
		url,
		param
	)
}