<script lang="ts">
	import _ from 'lodash';
	import { page } from '$app/stores';
	import Card from '$lib/Card.svelte';
	import Radar from '$lib/Radar.svelte';
	import SinceForked from '$lib/SinceForked.svelte';
	import Table from '$lib/Table.svelte';
	import Bubble from '$lib/Bubble.svelte';
	import Paragraph from '$lib/Paragraph.svelte';
	import type { Student, StudentGithubAggregate } from './+layout.server';

	let students: Student[] = $page.data.students;
	$: studentsAggregates = ($page.data.githubAggregates as StudentGithubAggregate[]) || [];
	$: orderedStudents = _.orderBy(students, ['login'], ['asc']);
</script>

<section class="flex flex-col gap-10">
	<section class="flex flex-wrap items-stretch  justify-center gap-4">
		<Card value={orderedStudents.length} description={'Total Students'} />
	</section>
	<article>
		<ol class="flex list-decimal flex-col items-center justify-center">
			{#each orderedStudents as { login }}
				<li class="text-left text-lg text-slate-400">{login}</li>
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
