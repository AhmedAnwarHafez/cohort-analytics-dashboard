<script lang="ts">
	import { page } from '$app/stores';
	import Card from '$lib/Card.svelte';
	import Radar from '$lib/Radar.svelte';
	import SinceForked from '$lib/SinceForked.svelte';
	import Table from '$lib/Table.svelte';
	import Bubble from '$lib/Bubble.svelte';
	import Paragraph from '$lib/Paragraph.svelte';
</script>

<section class="flex flex-col gap-10">
	<section class="flex grid-cols-4 flex-col justify-items-center gap-6 md:grid">
		<Card value={2.3} description={'Average days taken to start a challenge'} />
		<Card value={2.3} description={'Average days taken to start a challenge'} />
	</section>
	<hr class="border-1 block h-1 border-slate-700" />
	<article>
		<Paragraph
			title="Days passed since fork per challenge in table format"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<figure class="mt-5">
			<Bubble data={$page.data.githubAggregates} />
		</figure>
	</article>
	<hr class="border-1 block h-1 border-slate-700" />
	<article>
		<Paragraph
			title="Days passed since fork per challenge in table format"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<figure class="mt-5">
			<Table />
		</figure>
	</article>
	<hr class="border-1 block h-1 border-slate-700" />
	<article>
		<Paragraph
			title="Days passed since fork per challenge in table format"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<SinceForked />
	</article>
	<hr class="border-1 block h-1 border-slate-700" />
	<article>
		<Paragraph
			title="Days passed since fork per challenge in table format"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<Radar />
	</article>
</section>
