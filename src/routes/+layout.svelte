<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
</script>

<Nav />
<main class="container m-auto flex flex-col items-center gap-4 lg:flex-row lg:items-start">
	<slot />
</main>
