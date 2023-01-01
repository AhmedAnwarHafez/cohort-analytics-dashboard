<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Data } from './+page.server';

	export let data: Data;
</script>

<main class="container flex flex-col">
	<h2>Trello</h2>

	<form method="post" use:enhance>
		<label for="board">
			Board name
			<input type="text" name="board" />
		</label>
	</form>

	{#each data.boards as { name, bounces }}
		<div class="board">
			<h3>{name}</h3>
			<h3>{bounces}</h3>
		</div>
	{:else}
		<p>No boards found</p>
	{/each}
</main>
