<script lang="ts">
	import type { Data } from './+page.server';

	export let data: Data;
</script>

<main class="container mt-10 flex flex-row gap-8">
	<form method="get" class="mx-auto flex flex-col gap-10">
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
	<table class="table w-full  p-4 text-lg text-slate-300">
		<thead class="table-header-group">
			<tr class="table-row ">
				<th
					class="table-cell rounded-tl-xl border-l-[1px] border-t-[1px] border-slate-700 bg-slate-900 p-4 pt-6 text-center font-semibold"
				>
					Bounces
				</th>
				<th
					class="table-cell rounded-tr-xl border-r-[1px] border-t-[1px] border-slate-700 bg-slate-900 p-4 pt-6 text-left font-semibold"
				>
					Name
				</th>
			</tr>
		</thead>
		<tbody>
			{#each data.boards as { name, shortUrl, totalBounces, cards }}
				<tr class="table-row">
					<td class="table-body-cell border-l">
						{totalBounces}
					</td>
					<td class="table-body-cell border-r text-left">
						<details>
							<summary class="flex gap-4 text-slate-200"
								>{name}
								<a href={shortUrl} target="_blank" rel="noreferrer">
									<i class="fa-solid fa-arrow-up-right-from-square" /></a
								>
							</summary>
							<ul class="list-inside list-disc">
								{#each cards as card}
									<li class="text-left text-xl text-slate-200">
										<code class="p-2">{card.bounces}</code>
										<a href={card.shortUrl} class="text-sky-400 hover:underline">{card.name}</a>
									</li>
								{/each}
							</ul>
						</details>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
