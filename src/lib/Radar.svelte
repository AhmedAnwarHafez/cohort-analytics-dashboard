<script>
	import { Radar } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		PointElement,
		RadialLinearScale,
		LineElement
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);

	const data = {
		labels: ['Pupparazzi', 'Dreamfest', 'React-to-web-api', 'Sweet-as-organics', 'jwt-auth'],
		datasets: [
			{
				label: 'Alice',
				backgroundColor: 'rgba(194, 116, 161, 0.5)',
				borderColor: 'rgb(194, 116, 161)',
				data: [65, 59, 90, 81, 56]
			},
			{
				label: 'Bob',
				backgroundColor: 'rgba(71, 225, 167, 0.5)',
				borderColor: 'rgb(71, 225, 167)',
				data: [28, 48, 40, 19, 44]
			}
		]
	};
</script>

<Radar
	{data}
	options={{
		responsive: true,
		scales: {
			r: {
				grid: {
					color: 'hsl(0, 0%, 28%)'
				},
				pointLabels: {
					color: 'hsl(0, 0%, 80%)'
				}
			}
		}
	}}
/>
