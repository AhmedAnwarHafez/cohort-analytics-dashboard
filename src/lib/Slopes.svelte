<script lang="ts">
	import { onMount } from 'svelte';
	import Plotly from 'plotly.js-dist-min';
	import type { StudentLR } from 'src/routes/github/+page.server';

	export let data: StudentLR;

	onMount(async () => {
		let x = Array.from({ length: 10 }, (_, i) => i + 1);
		let y = Object.keys(data).map((student) =>
			x.map(
				(xValue) => data[student].daysSpentLR.slope * xValue + data[student].daysSpentLR.intercept
			)
		);
		let traces = Object.keys(data).map((student, i) => ({
			x,
			y: y[i],
			mode: 'scatter',
			name: data[student].githubLogin
		}));

		Plotly.newPlot('myDiv', traces);
	});
</script>

<div id="myDiv" style="width:900px;height:400px;" />
