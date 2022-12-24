<script lang="ts">
	import '../app.css';
	import type { Repo } from './+layout.server';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	export let data: { students: Student[]; repos: Repo[] };
	// read query params from the URL

	type Student = {
		id: string;
		login: string;
	};

	$: selectedRepos = $page.url.searchParams.getAll('repos');
	let selectedCohort: string;
	let cohorts = [
		'harakeke-2022',
		'kahikatea-2022',
		'matai-2022',
		'pohutukawa-2022',
		'horoeka-2022'
	];
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0"
/>
<nav class="flex flex-row items-center justify-between bg-slate-900">
	<h1 class="pl-4 text-center font-display text-3xl text-slate-400 lg:text-left">
		Cohort Analytics Dashboard
	</h1>
	<!-- a nav bar with three links, Github, Trello and Login -->
	<ul class="flex flex-row  justify-end gap-4 space-x-6 bg-slate-900 p-4">
		<li>
			<a href="#" class="flex flex-row items-center gap-2 text-slate-400 hover:text-slate-300">
				<span class="material-symbols-outlined">home</span>
				<span>Home</span>
			</a>
		</li>
		<li>
			<a href="#" class="flex flex-row items-center gap-2 text-slate-400 hover:text-slate-300">
				<span>Github</span>
			</a>
		</li>
		<li>
			<a href="#" class="flex flex-row items-center gap-2 text-slate-400 hover:text-slate-300">
				<span>Trello</span>
			</a>
		</li>
		<li>
			<a href="#" class="flex flex-row items-center gap-2 text-slate-400 hover:text-slate-300">
				<span class="material-symbols-outlined">login</span>
				<span>Login</span>
			</a>
		</li>
	</ul>
</nav>
<main class="container m-auto flex flex-col items-center gap-4 lg:flex-row lg:items-start">
	<aside class="flex flex-none basis-1/6 flex-col items-center gap-4 p-4 lg:pt-10 ">
		<form method="get">
			<select
				name="cohort"
				id="cohort"
				class="mb-2 w-full rounded-lg bg-slate-700 p-2 text-slate-300"
				required
				bind:value={selectedCohort}
			>
				<option value="">--COHORTS--</option>
				{#each cohorts as cohort}
					<option value={cohort}>{cohort}</option>
				{/each}
			</select>
			<ul class="flex flex-col gap-4">
				{#each data.repos as { name }}
					<li>
						<label for={name} class="mr-3 flex items-center gap-1 text-2xl text-slate-400">
							<!-- <input type="hidden" name="id" value={name} /> -->
							{#if selectedRepos.includes(name)}
								<input
									type="checkbox"
									name="repos"
									id={name}
									class="mr-2 h-6 w-6 bg-slate-100 text-green-500 focus:ring-slate-500"
									value={name}
									checked={true}
								/>
							{:else}
								<input
									type="checkbox"
									name="repos"
									id={name}
									class="mr-2 h-6 w-6 bg-slate-100 text-green-500 focus:ring-slate-500"
									value={name}
								/>
							{/if}
							{name}
						</label>
					</li>
				{/each}
			</ul>
			<button
				class="align-center mt-4 flex items-center gap-2 rounded bg-slate-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg"
			>
				<span class="material-symbols-outlined"> tune </span>
				Filter
			</button>
		</form>
	</aside>
	<section class="col-span-11 flex  grow items-center justify-center overflow-x-hidden">
		{#if data.students.length > 0}
			<article class="p-10" in:slide>
				<slot />
			</article>
		{:else}
			<p class="font-handwritten text-6xl italic text-slate-500">&lt-- use filters</p>
		{/if}
	</section>
</main>
