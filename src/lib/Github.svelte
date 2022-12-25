<script lang="ts">
	import type { Student, StudentGithubAggregate } from 'src/routes/+page.server';
	import Bubble from './Bubble.svelte';
	import Card from './Card.svelte';
	import Paragraph from './Paragraph.svelte';
	import Radar from './Radar.svelte';
	import SinceForked from './SinceForked.svelte';
	import Table from './Table.svelte';

	export let studentsAggregates: StudentGithubAggregate[];
	export let orderedStudents: Student[];
</script>

<section class="flex flex-col gap-10">
	<section class="flex flex-wrap items-stretch  justify-center gap-4">
		<Card value={orderedStudents.length} description={'Total Students'} />
	</section>
	<article class="flex flex-col items-center justify-center ">
		<ol class="list-decimal text-left">
			{#each orderedStudents as { login }}
				<li class=" text-lg text-slate-400">{login}</li>
			{/each}
		</ol>
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
		<Bubble data={studentsAggregates} />
	</article>
	<hr class="border-1 block h-1 border-slate-700" />
	<article>
		<Paragraph
			title="Days spent on challenge per student"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<figure class="mt-5">
			<Table data={studentsAggregates} column="daysSpentOnChallenge" />
		</figure>
	</article>
	<article>
		<Paragraph
			title="Days passed since fork per student"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<figure class="mt-5">
			<Table data={studentsAggregates} column="daysSinceForked" />
		</figure>
	</article>
	<article>
		<Paragraph
			title="Total commits per student"
			paragraph={`
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, fuga necessitatibus sit
			tenetur corporis culpa dignissimos illum mollitia exercitationem labore quibusdam temporibus
			cumque consequatur inventore eligendi magnam laudantium ducimus nisi.
		`}
		/>
		<figure class="mt-5">
			<Table data={studentsAggregates} column="totalCount" />
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
