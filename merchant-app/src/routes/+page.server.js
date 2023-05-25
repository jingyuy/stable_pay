import { PAYMENT_API_URL, PAYMENT_API_USER, PAYMENT_API_PASSWORD } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		config: {
			paymentApiUrl: PAYMENT_API_URL,
			paymentApiUser: PAYMENT_API_USER,
			paymentApiPassword: PAYMENT_API_PASSWORD
		}
	};
}
