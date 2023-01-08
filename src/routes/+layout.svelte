<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
</script>

<header>
	<Nav />
</header>
<main class="container m-auto flex flex-col items-center lg:flex-row lg:items-start">
	<slot />
</main>
