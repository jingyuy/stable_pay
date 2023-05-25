import axios from 'axios';
import { PAYMENT_API_URL, PAYMENT_API_USER, PAYMENT_API_PASSWORD } from '$env/static/private';
let paymentApiUrl = PAYMENT_API_URL;
let paymentApiUser = PAYMENT_API_USER;
let paymentApiPassword = PAYMENT_API_PASSWORD;

export async function createPayment(payload) {
	const url = paymentApiUrl + '/payment/create';
	const res = await axios.post(
		url,
		{
			amount: payload.amount,
			currency: payload.currency,
			merchantReference: payload.merchantReference
		},
		{
			auth: {
				username: paymentApiUser,
				password: paymentApiPassword
			}
		}
	);
	const data = res.data;
	return data;
}

export async function getPayment(paymentId) {
	const url = paymentApiUrl + `/payment/${paymentId}`;
	const res = await axios.get(url, {
		auth: {
			username: paymentApiUser,
			password: paymentApiPassword
		}
	});
	const data = res.data;
	return data;
}
