<script lang="ts">
	import { Bubble } from 'svelte-chartjs';
	import hash from 'string-hash';

	import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
	import type { StudentGithubAggregate } from 'src/routes/+layout.server';

	ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

	export let data: StudentGithubAggregate[];

	const datasets = data.map((student) => ({
		label: student.githubLogin,
		// get a random color for each student
		backgroundColor: `hsl(${hash(student.githubLogin) % 360}, 35%, 50%)`,
		hoverBackgroundColor: `hsl(${hash(student.githubLogin) % 360}, 35%, 50%)`,
		data: [
			{
				x: student.daysSinceForked,
				y: student.daysSpentOnChallenge,
				r: 10
			}
		]
	}));
</script>

<Bubble
	data={{
		labels: 'Bubble',
		datasets
	}}
	options={{
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Days to complete vs days since forked',
				color: 'hsl(0, 0%, 80%)',
				font: {
					size: 15
				}
			},
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
