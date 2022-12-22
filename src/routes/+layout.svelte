<script lang="ts">
	import '../app.css';

	type Student = {
		id: string;
		login: string;
	};
	export let data: { students: Student[] };
	/**
	 * @type {string[]}
	 */
	let cohorts = [
		'Harakeke-2022',
		'Kahikatea-2022',
		'Matai-2022',
		'Pohutukawa-2022',
		'Horoeka-2022'
	];
</script>

<main class="m-auto flex">
	<aside class="flex flex-none basis-1/6 flex-col items-center">
		<h1 class="p-10 text-center font-display text-3xl text-slate-400">
			Cohort Analytics Dashboard
		</h1>
		<select
			name="cohorts"
			id="cohorts"
			class="mb-2 w-40 rounded-lg bg-slate-700 p-2 text-slate-300"
		>
			{#each cohorts as cohort}
				<option value={cohort}>{cohort}</option>
			{/each}
		</select>
		<ul class="text-lg text-slate-500">
			{#each data.students as { login: name }}
				<li class="py-1">{name}</li>
			{/each}
		</ul>
	</aside>
	<section class="col-span-11 mt-5 mr-5 w-1/6 grow">
		<slot />
	</section>
</main>
