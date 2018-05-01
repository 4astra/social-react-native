import AppConfig from '../constants/config';

/**
 * @author Hoat Ha
 * @description format a currency number from currency code
 * @param {*} num 
 */
const minimumFractionDigits = 0;

export function currency(num) {

	// var formatter = new Intl.NumberFormat(AppConfig.numberFormat, {
	// 	style: 'currency',
	// 	currency: AppConfig.currencyCode,
	// 	minimumFractionDigits: 0,// the default value for minimumFractionDigits depends on the currency and is usually already 2
	// });

	// return formatter.format(num);

	var res = num.toFixed(minimumFractionDigits).replace(/./g, function(c, i, a) {
		return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	});
	return AppConfig.symbolCurrencyVN + res;
}