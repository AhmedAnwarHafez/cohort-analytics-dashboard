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

	<table class="mx-auto w-4/5 table-auto text-3xl text-slate-300">
		<thead>
			<tr>
				<th>Bounces</th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			{#each data.boards as { name, bounces }}
				<tr>
					<td class="border border-slate-400 p-4">{bounces}</td>
					<td class="border border-slate-400 p-4">{name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
