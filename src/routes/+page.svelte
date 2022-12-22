<script>
	import Card from '$lib/Card.svelte';
	import SinceForked from '$lib/SinceForked.svelte';
</script>

<section class="grid grid-cols-4 justify-items-center gap-6">
	<Card value={2.3} description={'Average days taken to start a challenge'} />
	<Card value={2.3} description={'Average days taken to start a challenge'} />
</section>
<SinceForked />
