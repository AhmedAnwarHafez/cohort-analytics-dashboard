<script>
	import { page } from '$app/stores';
</script>

<!-- align in the middle and center of the screen -->
<main class="flex h-screen flex-col justify-center text-4xl text-slate-300">
	<article class="border-l-4 border-l-slate-600 pl-4">
		<p>{$page.status}</p>
		<p>Something went wrong.</p>
		<em class="italic">{$page.error?.message}</em>
	</article>
</main>
