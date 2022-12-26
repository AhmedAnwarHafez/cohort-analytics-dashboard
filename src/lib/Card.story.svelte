<script context="module" lang="ts">
	import { Canvas, Frame } from '@leveluptuts/bookit';
	import Card from './Card.svelte';

	export const parent = 'Library';
	export const title = 'Card';
</script>

<Canvas>
	<Frame title="Basic Card">
		<Card description="some description" value={99} />
	</Frame>
</Canvas>
