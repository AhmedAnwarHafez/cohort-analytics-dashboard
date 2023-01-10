<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import hash from 'string-hash';
	import _ from 'lodash';
	import type { StudentGithubAggregate } from '../routes/github/+page.server';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	ChartJS.register(Title, Tooltip, Legend, BarElement, LinearScale, PointElement, CategoryScale);

	export let data: StudentGithubAggregate[];
	export let column: string;
	export let title: string;

	$: students = _.sortBy(data, ['githubLogin']);
	$: uniqueStudents = _.uniqBy(students, 'githubLogin');
	$: groupedByRepo = _.groupBy(students, 'repo');
</script>

<section>
	<Bar
		data={{
			labels: uniqueStudents.map((student) => student.githubLogin),
			datasets: Object.keys(groupedByRepo).map((repo) => ({
				label: repo,
				backgroundColor: `hsl(${hash(repo) % 360}, 80%, 70%)`,
				hoverBackgroundColor: `hsl(${hash(repo) % 360}, 45%, 70%)`,
				data: uniqueStudents
					.map((student) => {
						const studentData = groupedByRepo[repo].find(
							(row) => row.githubLogin === student.githubLogin
						);
						return studentData ? studentData[column] : 0;
					})
					.sort((a, b) => a - b)
			}))
		}}
		options={{
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: title,
					color: 'hsl(0, 0%, 80%)'
				},
				legend: {
					labels: {
						color: 'hsl(0, 0%, 80%)'
					}
				}
			},
			scales: {
				y: {
					grid: {
						color: 'hsl(10, 0%, 25%)'
					},
					title: {
						display: true,
						text: 'Value',
						color: 'hsl(0, 0%, 80%)'
					},
					ticks: {
						color: 'hsl(0, 0%, 80%)'
					}
				},
				x: {
					grid: {
						color: ''
					},
					title: {
						display: true,
						text: 'Month',
						color: 'hsl(0, 0%, 80%)'
					},

					ticks: {
						color: 'hsl(0, 0%, 80%)'
					}
				}
			}
		}}
	/>
</section>
