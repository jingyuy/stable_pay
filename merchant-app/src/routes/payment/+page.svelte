<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { onMount } from 'svelte';

	onMount(async () => {
		location.href = data.checkout.paymentUrl;
	});
</script>
