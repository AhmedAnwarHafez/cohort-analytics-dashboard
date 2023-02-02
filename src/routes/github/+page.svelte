<script lang="ts">
	import _ from 'lodash';

	import Github from '$lib/Github.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import type { Data } from './+page.server';

	export let data: Data;
	// read query params from the URL
	$: students = data.students;
	$: studentsAggregates = data.githubAggregates || [];
	$: orderedStudents = _.orderBy(students, ['login'], ['asc']);
</script>

<Sidebar repos={data.repos} cohorts={data.cohorts} />
<section>
	{#if data.students.length > 0}
		<article class="p-10">
			<Github {orderedStudents} {studentsAggregates} studentSlopes={data.studentSlopes} />
		</article>
	{:else}
		<p class="font-handwritten text-6xl italic text-slate-500">&lt-- use filters</p>
	{/if}
</section>
