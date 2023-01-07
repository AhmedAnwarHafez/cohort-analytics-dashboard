<script lang="ts">
	import { navigating } from '$app/stores';
	import type { Data } from './+page.server';

	export let data: Data;
</script>

<main class="container mt-10 flex flex-row gap-8">
	<form method="get" class="mx-auto flex flex-col gap-10">
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
		<ul>
			{#each data.organisations as org}
				<li class="text-slate-200">
					<label for={org.name}>
						<input type="checkbox" name="orgs" id={org.name} value={org.name} />
						{org.name}
					</label>
				</li>
			{/each}
		</ul>
	</form>
	<div class="table w-full  p-4 text-lg text-slate-300">
		<div class="table-header-group">
			<div class="table-row ">
				<div
					class="table-cell rounded-tl-xl border-l-[1px] border-t-[1px] border-slate-700 bg-slate-900 p-4 pt-6 text-center font-semibold"
				>
					Bounces
				</div>
				<div
					class="table-cell rounded-tr-xl border-r-[1px] border-t-[1px] border-slate-700 bg-slate-900 p-4 pt-6 text-center font-semibold"
				>
					Name
				</div>
			</div>
		</div>
		{#each data.boards as { name, bounces }}
			<div class="table-row-group">
				<div class="table-row">
					<div class="table-body-cell border-l">
						{bounces}
					</div>
					<div class="table-body-cell border-r">
						{name}
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
