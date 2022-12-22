<script lang="ts">
	const data = Array.from({ length: 10 }, () => Math.random() * 10);
	const rand = () => Math.random() * 10;
	const challenges = [
		'pupparazzi',
		'dreamfest',
		'worldwide-routing',
		'react-to-web-api',
		'sweet-as-organics-api',
		'jwt-auth',
		'AVG'
	];
</script>

<div class="table w-full rounded-xl border-2 border-slate-500 p-4 text-lg text-slate-300">
	<div class="table-header-group bg-slate-700">
		<div class="table-row">
			<div class="table-cell ">Student</div>
			{#each challenges as challenge}
				<div class="table-cell text-right">{challenge}</div>
			{/each}
		</div>
	</div>
	<div class="table-row-group">
		{#each data as _}
			<div class="table-row">
				<div class="table-cell">Malcolm Lockyer</div>
				{#each challenges as challenge}
					{#if rand() < 4}
						<div class="table-cell text-right">{rand().toFixed(2)}</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>

	<div class="table-footer-group">
		<div class="table-row bg-slate-700">
			<div class="table-cell text-right">AVG</div>
			<div class="table-cell text-right">5.5</div>
			<div class="table-cell text-right">5.5</div>
			<div class="table-cell text-right">5.5</div>
			<div class="table-cell text-right">5.5</div>
			<div class="table-cell text-right">5.5</div>
			<div class="table-cell text-right">5.5</div>
			<div class="table-cell text-right">5.5</div>
		</div>
	</div>
</div>
