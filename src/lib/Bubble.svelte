<script lang="ts">
	import { Bubble } from 'svelte-chartjs';
	import hash from 'string-hash';

	import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
	import type { StudentGithubAggregate } from 'src/routes/github/+page.server';
	import _ from 'lodash';

	ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

	export let data: StudentGithubAggregate[];
	$: groupedByRepo = _.groupBy(data, 'repo');
	export let showTotalCommitCount = false;

	function normalize<T extends number>(array: T[], min: number, max: number) {
		const range = max - min;
		return array.map((element) => (element - min) / range);
	}

	function getByRepo(repo: string) {
		const normalizedTotalCount = normalize(
			data.map((row) => row.totalCount),
			0,
			0.4
		);
		const normalizedData = data.map((row, index) => ({
			...row,
			totalCount: normalizedTotalCount[index]
		}));

		return normalizedData
			.filter((row) => row.repo === repo)
			.map((student) => ({
				label: student.githubLogin,
				// get a random color for each student
				backgroundColor: `hsl(${hash(student.githubLogin) % 360}, 80%, 70%)`,
				hoverBackgroundColor: `hsl(${hash(student.githubLogin) % 360}, 45%, 70%)`,
				data: [
					{
						x: student.daysSinceForked.toFixed(2),
						y: student.daysSpentOnChallenge.toFixed(2),
						// r is the size of the bubble, 5 is the minimum size
						// normalize the total count to be between 5 and 20
						r: showTotalCommitCount ? student.totalCount : 10
					}
				]
			}));
	}
</script>

{#each Object.keys(groupedByRepo) as repo}
	<figure class="mt-5 rounded-2xl border border-slate-500 p-2">
		<figcaption class="text-center text-4xl text-slate-400">{repo}</figcaption>
		{#key showTotalCommitCount}
			<Bubble
				data={{
					labels: 'Bubble',
					datasets: getByRepo(repo)
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
		{/key}
	</figure>
{/each}
