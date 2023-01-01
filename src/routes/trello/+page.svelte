<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Data } from './+page.server';

	export let data: Data;
</script>

<main class="container mt-10 flex flex-col gap-8">
	<form method="post" use:enhance class="mx-auto">
		<label for="board" class="flex flex-col">
			<span class="text-slate-400">Board Name</span>
			<input type="text" name="board" class="text-4xl" />
		</label>
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
