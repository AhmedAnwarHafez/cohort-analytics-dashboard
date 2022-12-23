<script lang="ts">
	import type { Repo } from '../routes/+layout.server';
	export let repos: Repo[];
</script>

<h3>Challenges</h3>
<article>
	<ul class="wrap grid grid-cols-8 items-center gap-4">
		{#each repos as { name }}
			<li>
				<label for={name} class="flex items-center gap-1 text-2xl text-slate-400">
					<input
						type="checkbox"
						{name}
						id={name}
						class="h-6 w-6  bg-slate-100 text-green-500 focus:ring-slate-500"
					/>
					{name}
				</label>
			</li>
		{/each}
	</ul>
</article>
