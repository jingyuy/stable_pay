<script>
	import axios from 'axios';

	export let paymentApiUrl;
	export let paymentApiUser;
	export let paymentApiPassword;

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
</script>

<div />
