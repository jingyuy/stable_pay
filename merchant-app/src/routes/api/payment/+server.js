import { createPayment, getPayment } from '$lib/server/gateway.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const checkout = await getPayment(url.searchParams.get('paymentId'));
	return json(checkout);
}

export async function POST({ request }) {
	const { amount, currency, merchantReference } = await request.json();
	const checkout = await createPayment({
		amount: amount,
		currency: currency,
		merchantReference: merchantReference
	});
	return json(checkout);
}
