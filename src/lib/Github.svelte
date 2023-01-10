<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import type { Student, StudentGithubAggregate } from 'src/routes/github/+page.server';
	import Bubble from './Bubble.svelte';
	import Card from './Card.svelte';
	import Paragraph from './Paragraph.svelte';
	import Radar from './Radar.svelte';
	import TotalCommits from './TotalCommits.svelte';
	import Table from './Table.svelte';
	import _ from 'lodash';

	export let studentsAggregates: StudentGithubAggregate[];
	export let orderedStudents: Student[];
	let showTotalCommitCount = false;

	// group by challenge
	$: challenges = _.groupBy(studentsAggregates, 'repo');
	$: cohort = new URLSearchParams($page.url.searchParams).get('cohort');
</script>

<section class="flex flex-col gap-10" transition:fade>
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
	<hr />
	<h4 class="text-2xl text-slate-400">
		Students in <me class="rounded-xl bg-slate-900 p-1 px-3">{cohort?.toLocaleUpperCase()}</me>
	</h4>
	<section class="flex flex-wrap items-stretch justify-center gap-4 p-4">
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
	<article class="flex flex-col">
		<Paragraph title="Days passed since fork per challenge in table format">
			<p class="indent-8 text-lg text-slate-400">
				This visualisation is a bubble chart. The x-axis represents the <strong>Days Spent</strong>
				and y-axis is represents <strong>Days Since Forked</strong>. Each bubble represents a
				student. Bubbles that are positioned in the bottom left corner are performing well, while
				bubbles that are positioned in the top right corner are not performing well.
			</p>
		</Paragraph>

		<label for="showTotalCounts" class="flex items-center gap-2 self-end text-xl text-slate-300">
			<input
				type="checkbox"
				name="showTotalCounts"
				id="showTotalCounts"
				bind:checked={showTotalCommitCount}
			/>
			Show total commit counts
		</label>
		<Bubble data={studentsAggregates} bind:showTotalCommitCount />
	</article>
	<hr />
	<article>
		<Paragraph title="Days spent on challenge per student">
			<p class="indent-8 text-lg text-slate-400">
				This is a table that shows the <strong>Days spent</strong> for each student and the average time
				spent on selected challenges.
			</p>
		</Paragraph>
		<figure class="mt-5">
			<Table data={studentsAggregates} column="daysSpentOnChallenge" />
		</figure>
	</article>
	<article>
		<Paragraph title="Days passed since fork per student">
			<p class="indent-8 text-lg text-slate-400">
				This is a table that shows the <strong>Days Since Forked</strong> for each student and the average
				time spent on selected challenges.
			</p>
		</Paragraph>
		<figure class="mt-5">
			<Table data={studentsAggregates} column="daysSinceForked" />
		</figure>
	</article>
	<article>
		<Paragraph title="Total Commits">
			<p class="indent-8 text-lg text-slate-400">
				This is a table that shows the <strong>Total Number of Commits</strong> for each student and
				the average for each challenge. This information could be handy.
			</p>
		</Paragraph>
		<figure class="mt-5">
			<Table data={studentsAggregates} column="totalCount" />
		</figure>
	</article>
	<hr />
	<article>
		<Paragraph title="Total Commits per challenge">
			<p class="indent-8 text-lg text-slate-400">
				This is a table that shows the <strong>Total Number of Commits</strong> for each student
				across all branches. The values is calculated by counting the unique <code>commitId</code> for
				each student for all branches. This information could be handy to identify students who are not
				contributing to Group projects.
			</p>
		</Paragraph>
		{#each Object.entries(challenges) as [challenge, students]}
			<figure class="mt-5">
				<TotalCommits data={students} column="totalCount" title={challenge} />
			</figure>
		{/each}
	</article>
	<hr />
	<article>
		<Paragraph title="UNDER DEVELOPMENT" />
		<Radar />
	</article>
</section>
