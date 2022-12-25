<script lang="ts">
	import { Bubble } from 'svelte-chartjs';
	import hash from 'string-hash';

	import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
	import type { StudentGithubAggregate } from 'src/routes/+page.server';
	import { groupBy } from 'lodash';

	ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

	export let data: StudentGithubAggregate[];
	$: groupedByRepo = groupBy(data, 'repo');

	function getByRepo(repo: string) {
		return data
			.filter((row) => row.repo === repo)
			.map((student) => ({
				label: student.githubLogin,
				// get a random color for each student
				backgroundColor: `hsl(${hash(student.githubLogin) % 360}, 45%, 70%)`,
				hoverBackgroundColor: `hsl(${hash(student.githubLogin) % 360}, 45%, 70%)`,
				data: [
					{
						x: student.daysSinceForked,
						y: student.daysSpentOnChallenge,
						// r is the size of the bubble, 5 is the minimum size
						r: 10 //+ student.totalCount
					}
				]
			}));
	}
</script>

{#each Object.keys(groupedByRepo) as repo}
	<figure class="mt-5">
		<figcaption class="text-center text-4xl text-slate-400">{repo}</figcaption>
		<Bubble
			data={{
				labels: 'Bubble',
				datasets: getByRepo(repo)
			}}
			options={{
				responsive: true,
				annotation: {
					annotations: [
						{
							type: 'line',
							mode: 'horizontal',
							scaleID: 'y-axis-0',
							value: 5,
							borderColor: 'rgb(75, 192, 192)',
							borderWidth: 4,
							label: {
								enabled: false,
								content: 'Test label'
							}
						}
					]
				},
				plugins: {
					legend: {
						labels: {
							color: 'hsl(0, 0%, 80%)'
						}
					}
				},
				scales: {
					x: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Days spent to complete challenge',
							color: 'hsl(0, 0%, 80%)'
						}
					},
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Days since challenge forked',
							color: 'hsl(0, 0%, 80%)'
						}
					}
				}
			}}
		/>
	</figure>
{/each}
