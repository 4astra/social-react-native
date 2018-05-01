import * as API from '../utils/api';
import AppDomain from '../constants/domain';

/**
 * @author Hoat Ha
 * @desc Auth Services
 */

export async function register(param) {
	let url = AppDomain.devAPI + AppDomain.socialNetworkLogin;//AppDomain.baseURL2 + AppDomain.socialNetworkLogin;
	
	return API.request('POST', url, param).then((res) => {
		console.log('Respone:' + JSON.stringify(res));
		return res.body;
	}).catch((error) => {
		console.log('Error: ' + error);
		return error;
	});
}