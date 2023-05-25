import { createPayment, getPayment } from '$lib/server/gateway.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const queryParams = new URL(url).searchParams;
	const paymentId = queryParams.get('paymentId');
	const amount = queryParams.get('amount');
	const currency = queryParams.get('currency');
	const merchantReference = queryParams.get('merchantReference');
	if (paymentId != null) {
		const checkout = await getPayment(paymentId);
		return { checkout };
	} else {
		const checkout = await createPayment({
			amount: amount,
			currency: currency,
			merchantReference: merchantReference
		});
		return { checkout };
	}
}
