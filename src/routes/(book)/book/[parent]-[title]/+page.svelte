<script lang="ts">
	import { Bookit } from '@leveluptuts/bookit';
	type Data = {
		props: {
			params: {
				parent: string;
				title: string;
			};
		};
	};
	export let data: Data;
</script>

<Bookit params={data.props.params} />
