<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Cohort, Repo } from 'src/routes/github/+page.server';
	import { updateParams } from './searchParams';

	export let repos: Repo[];
	export let cohorts: Cohort[];

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newSearchParam = updateParams(target, $page.url.searchParams);

		// now we have a new URLSearchParams object, we can use it to update the URL
		// and force a navigation that will trigger the loader function in the backend
		// we also want to keep the focus on the page, so we pass `keepFocus: true`
		goto(`?${newSearchParam.toString()}`, { replaceState: true, keepFocus: true });
	}
</script>

<aside class="flex  flex-col items-center gap-4 p-4 lg:pt-10 ">
	<form method="get" class="flex flex-col gap-2">
		<fieldset>
			<label for="cohort" class="text-slate-500">Filter by cohort</label>
			<!-- bind:value={selectedCohort} -->
			<select
				name="cohort"
				id="cohort"
				class="mb-2 w-full rounded-lg bg-slate-700 p-2 text-slate-300"
				required
				value={new URLSearchParams($page.url.search).get('cohort') || ''}
				on:change={handleInput}
			>
				<option value="">--COHORTS--</option>
				{#each cohorts as name}
					<option value={name}>{name}</option>
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
							<input
								type="checkbox"
								name="repos"
								id={name}
								class="mr-2 inline-block h-6 w-6 bg-slate-100 align-text-top text-green-500 focus:ring-slate-500"
								value={name}
								checked={new URLSearchParams($page.url.search).getAll('repos').includes(name) ||
									false}
								on:change={handleInput}
							/>

							<!-- {name} -->
							<span class="w-56 truncate lg:w-48" title={name}>{name}</span>
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>
	</form>
</aside>
