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
			openNewWindow(`/payment?paymentId=${paymentId}`);
		}
	});

	const onCheckout = async () => {
		inputEnabled = false;
		openNewWindow(`/payment?amount=${amount}&currency=USDT&merchantReference=abc`);
	};

	const onLogout = async () => {
		location.href = '/sign-in?signout=true';
	};
</script>

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
		<button on:click={onCheckout}>Checkout</button>
	</p>

	<p>
		<button on:click={onLogout}>Logout</button>
	</p>
</div>
