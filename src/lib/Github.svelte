<script lang="ts">
	import type { Student, StudentGithubAggregate } from 'src/routes/github/+page.server';
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
	<article class="flex flex-col gap-4">
		<h2 class="text-2xl text-slate-400 underline">What&apos;s on this page</h2>
		<p class="explain-paragraph">
			This page displays different kinds of visualisations to help teachers to identify students who
			go off the radar. The visualisations below are based on the data collected from Github&apos;s
			GraphQL API. The visualisations below focus on two columns that are automatically calculated: <strong
				>Days Spent</strong
			>
			and <strong>Days Since Forked</strong>.
		</p>
		<dl class="flex flex-col gap-2 text-xl text-slate-400">
			<dt><strong>Days Spent</strong></dt>
			<dd class="ml-4">
				<p class="explain-paragraph">
					The time delta (diff) between the first commit date and the last commit date. Or, how many
					days the student spent on a challenge.
				</p>
			</dd>
			<dt><strong>daysSinceForked</strong></dt>
			<dd class="ml-4">
				<p class="explain-paragraph">
					The time the student took to start working on a challenge. This is measured by calculating
					the time delta (diff) between <code>repo.createdAt</code> and the first commit date
				</p>
			</dd>
		</dl>
		<p class="explain-paragraph">
			With these two columns we can determine students who are having a rough time, procrastinating,
			etc.
		</p>
	</article>
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
	<hr />
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
	<hr />
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
	<hr />
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
	<hr />
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
