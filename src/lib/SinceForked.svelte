<script>
	import { Bar } from 'svelte-chartjs';
	import { data } from './data';
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
</script>

<section>
	<Bar
		{data}
		options={{
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'Custom Chart Title',
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
