<script lang="ts">
	import _ from 'lodash';
	import { page } from '$app/stores';

	import Nav from '$lib/Nav.svelte';
	import type { Repo, Student, StudentGithubAggregate } from './+page.server';
	import Github from '$lib/Github.svelte';
	import '../app.css';
	import Sidebar from '$lib/Sidebar.svelte';

	export let data: { students: Student[]; repos: Repo[] };

	// read query params from the URL
	$: selectedRepos = $page.url.searchParams.getAll('repos');
	let selectedCohort: string;
	let cohorts = [
		{
			name: 'harakeke-2022',
			startDate: '2022-01-03T00:00:00Z'
		},
		{
			name: 'kahikatea-2022',
			startDate: '2022-03-14T00:00:00Z'
		},
		{
			name: 'matai-2022',
			startDate: '2022-05-23T00:00:00Z'
		},
		{
			name: 'pohutukawa-2022',
			startDate: '2022-08-01T00:00:00Z'
		},
		{
			name: 'horoeka-2022',
			startDate: '2022-10-09T00:00:00Z'
		}
	];

	let students: Student[] = $page.data.students;
	$: studentsAggregates = ($page.data.githubAggregates as StudentGithubAggregate[]) || [];
	$: orderedStudents = _.orderBy(students, ['login'], ['asc']);
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0"
/>

<Nav />
<main class="container m-auto flex flex-col items-center gap-4 lg:flex-row lg:items-start">
	<Sidebar repos={data.repos} {selectedCohort} {selectedRepos} {cohorts} />
	<section class="col-span-11 flex  grow items-center justify-center overflow-x-hidden">
		{#if data.students.length > 0}
			<article class="p-10">
				<Github {orderedStudents} {studentsAggregates} />
			</article>
		{:else}
			<p class="font-handwritten text-6xl italic text-slate-500">&lt-- use filters</p>
		{/if}
	</section>
</main>
