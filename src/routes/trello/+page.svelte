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

	{#each data.boards as board}
		<div class="board">
			<h3>{board}</h3>
		</div>
	{/each}
</main>
