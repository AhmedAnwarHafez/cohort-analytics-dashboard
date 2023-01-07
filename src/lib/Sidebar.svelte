<script lang="ts">
	import { navigating } from '$app/stores';
	import type { Repo } from 'src/routes/github/+page.server';

	export let repos: Repo[];
	export let selectedCohort: string;
	export let selectedRepos: string[];
	export let cohorts: { name: string; startDate: string }[];
</script>

<aside class="flex flex-none basis-1/6 flex-col items-center gap-4 p-4 lg:pt-10 ">
	<form method="get" class="flex flex-col gap-2">
		{#if $navigating}
			<button
				class="rounded bg-slate-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg"
			>
				<i class="fa-solid fa-spinner fa-spin" />
				Loading
			</button>
		{:else}
			<button
				class="rounded bg-slate-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg"
			>
				<i class="fa-solid fa-filter" />
				Filter
			</button>
			<button
				type="reset"
				class="rounded bg-slate-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg"
			>
				<i class="fa-regular fa-trash-can" />
				Reset
			</button>
		{/if}

		<fieldset>
			<label for="cohort" class="text-slate-500">Filter by cohort</label>
			<!-- bind:value={selectedCohort} -->
			<select
				name="cohort"
				id="cohort"
				class="mb-2 w-full rounded-lg bg-slate-700 p-2 text-slate-300"
				required
			>
				<option value="">--COHORTS--</option>
				{#each cohorts as { name, startDate }}
					<option value={`${name}|${startDate}`}>{name}</option>
				{/each}
			</select>
		</fieldset>
		<fieldset>
			<label for="repos" class="text-slate-500">Filter by repos</label>
			<ul id="repos" class="flex h-[50vh] flex-col gap-1 overflow-y-auto">
				{#each repos as { name }}
					<li>
						<label for={name} class="mr-3 flex gap-1 text-xl text-slate-400">
							<!-- <input type="hidden" name="id" value={name} /> -->
							{#if selectedRepos.includes(name)}
								<input
									type="checkbox"
									name="repos"
									id={name}
									class="mr-2 inline-block h-6 w-6 bg-slate-100 align-text-top text-green-500 focus:ring-slate-500"
									value={name}
									checked={true}
								/>
							{:else}
								<input
									type="checkbox"
									name="repos"
									id={name}
									class="mr-2 inline-block h-6 w-6 bg-slate-100 align-text-top text-green-500 focus:ring-slate-500"
									value={name}
								/>
							{/if}
							{name}
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>
	</form>
</aside>
