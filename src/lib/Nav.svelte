<script lang="ts">
	import { navigating } from '$app/stores';
	import { ProgressBar } from '@skeletonlabs/skeleton';
</script>

<nav
	class="flex flex-row items-center justify-between border-b border-b-slate-500 bg-slate-900 p-4"
>
	<section class="flex">
		<picture>
			<img src="/logo.png" alt="Logo of Dev Academy" class="h-10 w-10" />
		</picture>
		<h1 class="pl-4 text-center text-3xl text-slate-400 lg:text-left">
			Cohort Analytics Dashboard
		</h1>
	</section>
	<!-- a nav bar with three links, Github, Trello and Login -->
	<ul class="flex flex-row  justify-end gap-4 space-x-6  p-4">
		<li>
			<a
				href="/github"
				class="flex flex-row items-center gap-2 text-slate-400 hover:text-slate-300"
			>
				<span>Github</span>
			</a>
		</li>
		<li>
			<a
				href="/trello"
				class="flex flex-row items-center gap-2 text-slate-400 hover:text-slate-300"
			>
				<span>Trello</span>
			</a>
		</li>
	</ul>
</nav>

{#if $navigating}
	<ProgressBar height="h-[1px]" min={0} max={100} meter="bg-slate-400" />
{/if}
