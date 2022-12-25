<script context="module" lang="ts">
	import { Canvas, Frame } from '@leveluptuts/bookit';
	import Card from './Card.svelte';

	export const parent = 'components';
	export const title = 'parent';
</script>

<Canvas>
	<Frame title="Basic Card">
		<Card description="some description" value={99} />
	</Frame>
</Canvas>
