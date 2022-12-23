<script lang="ts">
	import { Bubble } from 'svelte-chartjs';

	import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

	const data = {
		labels: 'Bubble',
		datasets: [
			{
				label: 'John',
				data: [
					{
						x: 4.6,
						y: 0.9,
						r: 10
					},
					{
						x: 4.6,
						y: 5.9,
						r: 10
					}
				],
				backgroundColor: '#ff6384',
				hoverBackgroundColor: '#ff6384'
			},
			{
				label: 'Peter',
				data: [
					{
						x: 24.2,
						y: 0.8,
						r: 10
					}
				],
				backgroundColor: '#44e4ee',
				hoverBackgroundColor: '#44e4ee'
			},
			{
				label: 'Donald',
				data: [
					{
						x: 7.4,
						y: 3.8,
						r: 13
					}
				],
				backgroundColor: '#62088A',
				hoverBackgroundColor: '#62088A'
			}
		]
	};
</script>

<Bubble
	{data}
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
