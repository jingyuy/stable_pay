<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { onMount } from 'svelte';
	import Gateway from './Gateway.svelte';

	let paymentId;

	let gateway;

	let inputEnabled = true;

	let amount = 0;
	const handleAmountChange = (e) => {
		amount = e.target.value;
	};

	function openNewWindow(url) {
		window.open(url, '_blank', 'width=600,height=400');
	}

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		paymentId = urlParams.get('paymentId');
		if (paymentId != null) {
			const checkout = await gateway.getPayment(paymentId);
			amount = checkout.amount;
			inputEnabled = false;
			openNewWindow(checkout.paymentUrl);
		}
	});

	const onCheckout = async () => {
		const checkout =
			paymentId == null
				? await gateway.createPayment({
						amount: amount,
						currency: 'USDT',
						merchantReference: 'abc'
				  })
				: await gateway.getPayment(paymentId);
		inputEnabled = false;
		paymentId = checkout.id;
		openNewWindow(checkout.paymentUrl);
	};
</script>

<Gateway bind:this={gateway} {...data.config} />

<div>
	<p>Total USDT:</p>
	<input
		type="number"
		id="amount"
		name="amount"
		value={amount}
		min="0"
		max="100"
		step="0.000001"
		class="w-auto mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
		placeholder="Enter amount"
		disabled={!inputEnabled}
		on:change={handleAmountChange}
	/>
	<p>
		<button on:click={onCheckout}> Checkout </button>
	</p>
</div>
