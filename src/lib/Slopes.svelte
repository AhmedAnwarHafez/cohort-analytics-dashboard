<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import hash from 'string-hash';

	import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
	import type { StudentLR } from 'src/routes/github/+page.server';
	import _ from 'lodash';
	import { entries } from 'lodash';
	import { object } from 'zod';

	ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

	export let data: StudentLR;
	// convert the data to an array of arrays
	// each array will have the student's github login and the slope
	// $: studentSlopes = Object.values(data).map(({ githubLogin, daysSpentLR }) => ({
	// 	githubLogin
	// }));

	$: heatColor = (value: number) => {
		if (value < 0) {
			return 'hsl(0, 35%, 50%)';
		} else if (value < 1) {
			return 'hsl(60, 35%, 50%)';
		} else if (value < 2) {
			return 'hsl(120, 35%, 50%)';
		} else if (value < 3) {
			return 'hsl(180, 35%, 50%)';
		} else if (value < 4) {
			return 'hsl(240, 35%, 50%)';
		} else if (value < 5) {
			return 'hsl(300, 35%, 50%)';
		} else {
			return 'hsl(360, 35%, 50%)';
		}
	};
</script>

<figure class="mt-5 rounded-2xl border border-slate-500 p-2">
	<Line
		data={{
			labels: 'Bubble',
			datasets: Object.keys(data).map((student) => ({
				label: data[student].githubLogin,
				pointRadius: 10,
				pointHoverRadius: 15,
				// get a random color for each student
				backgroundColor: `hsl(${hash(data[student].githubLogin) % 360}, 80%, 70%)`,
				hoverBackgroundColor: `hsl(${hash(data[student].githubLogin) % 360}, 45%, 70%)`,
				// we have slope and intercept, so we can get the y-intercept
				// the intercept is the point where the line crosses the y-axis and it will be the point where the days spent is 0
				// now we need to define two points on the line, so we can draw it
				data: [
					{
						x: 0,
						y: data[student].daysSpentLR.intercept
					},
					{
						x: 100,
						y: data[student].daysSpentLR.slope * 100 + data[student].daysSpentLR.intercept
					}
				]
			}))
		}}
		options={{
			responsive: true,
			plugins: {
				legend: {
					labels: {
						color: 'hsl(0, 0%, 80%)',
						font: {
							size: 20
						}
					}
				},
				tooltip: {
					bodyFont: {
						size: 25
					}
				}
			},
			scales: {
				x: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Days spent',
						color: 'hsl(0, 0%, 80%)',
						font: {
							size: 20
						}
					},
					ticks: {
						color: 'hsl(0, 50%, 100%)',
						font: {
							size: 14
						}
					}
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Days since forked',
						color: 'hsl(0, 0%, 80%)',
						font: {
							size: 20
						}
					},
					ticks: {
						color: 'hsl(0, 50%, 100%)',
						font: {
							size: 14
						}
					}
				}
			}
		}}
	/>
</figure>
