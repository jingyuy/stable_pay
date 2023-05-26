<script>
	import { onMount } from 'svelte';

	let paymentId;

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
			inputEnabled = false;
			const response = await fetch(`/api/payment?paymentId=${paymentId}`, {
				method: 'GET'
			});
			const { paymentUrl } = await response.json();
			window.open(paymentUrl, '_blank', 'width=600,height=400');
		}
	});

	const onCheckout = async () => {
		inputEnabled = false;
		const response = await fetch('/api/payment', {
			method: 'POST',
			body: JSON.stringify({
				amount: amount,
				currency: 'USDT',
				merchantReference: 'abc'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { paymentUrl } = await response.json();
		window.open(paymentUrl, '_blank', 'width=600,height=400');
	};

	const onLogout = async () => {
		location.href = '/sign-in?signout=true';
	};
</script>

<div class="flex justify-center items-center v-screen">
	<div class="bg-gray-200 p-4">
		<!-- Your content here -->
		<p>Total USDT:</p>
		<input
			type="number"
			id="amount"
			name="amount"
			value={amount}
			min="0"
			max="100"
			step="0.01"
			class="w-auto mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
			placeholder="Enter amount"
			disabled={!inputEnabled}
			on:change={handleAmountChange}
		/>
		<p>
			<button class="flex" on:click={onCheckout}>Checkout</button>
		</p>

		<p>
			<button class="flex" on:click={onLogout}>Logout</button>
		</p>
	</div>
</div>
