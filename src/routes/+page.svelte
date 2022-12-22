<script>
	import Card from '$lib/Card.svelte';
	import Radar from '$lib/Radar.svelte';
	import SinceForked from '$lib/SinceForked.svelte';
	import Table from '$lib/Table.svelte';
</script>

<section class="flex flex-col gap-10">
	<section class="flex grid-cols-4 flex-col justify-items-center gap-6 md:grid">
		<Card value={2.3} description={'Average days taken to start a challenge'} />
		<Card value={2.3} description={'Average days taken to start a challenge'} />
	</section>
	<article>
		<h3 class="text-lg text-slate-300">Days passed since fork per challenge in table format</h3>
		<p class="ml-2 text-lg text-slate-400">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		</p>
		<figure class="mt-5">
			<Table />
		</figure>
	</article>
	<article>
		<h3 class="text-lg text-slate-300">Days passed since fork</h3>
		<p class="ml-2 text-lg text-slate-400">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		</p>
		<SinceForked />
	</article>

	<article>
		<h3 class="text-lg text-slate-300">Days passed since fork per challenge</h3>
		<p class="ml-2 text-lg text-slate-400">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		</p>
		<Radar />
	</article>
</section>
