<script lang="ts">
	import _ from 'lodash';
	import { page } from '$app/stores';

	import type { Cohort, Repo, Student, StudentGithubAggregate } from './+page.server';
	import Github from '$lib/Github.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	export let data: { students: Student[]; repos: Repo[]; cohorts: Cohort[] };
	$: console.log(data);
	// read query params from the URL
	let students: Student[] = $page.data.students;
	$: selectedRepos = $page.url.searchParams.getAll('repos');
	$: studentsAggregates = ($page.data.githubAggregates as StudentGithubAggregate[]) || [];
	$: orderedStudents = _.orderBy(students, ['login'], ['asc']);
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0"
/>

<Sidebar repos={data.repos} cohorts={data.cohorts} {selectedRepos} />
<section class="col-span-11 flex  grow items-center justify-center overflow-x-hidden">
	{#if data.students.length > 0}
		<article class="p-10">
			<Github {orderedStudents} {studentsAggregates} />
		</article>
	{:else}
		<p class="font-handwritten text-6xl italic text-slate-500">&lt-- use filters</p>
	{/if}
</section>
