<script>
	import '../app.css';

	/**
	 * @type {string[]}
	 */
	let names = [].concat(...new Array(11).fill(['Bob', 'Alice', 'Charlie']));
</script>

<h1 class="p-10 text-3xl text-slate-400">Cohort Dashboard</h1>
<main class="m-auto grid w-5/6 grid-cols-12">
	<aside class="w-auto border-r-2 border-r-slate-500">
		<ul class="text-lg text-slate-500">
			{#each names as name}
				<li class="py-1">{name}</li>
			{/each}
		</ul>
	</aside>
	<section class="col-span-11 ml-4">
		<slot />
	</section>
</main>
