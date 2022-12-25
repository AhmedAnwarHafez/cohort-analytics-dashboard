## Installation
```sh
npm install
or
pnpm install
npm run dev
```

## Storybooks
Suppose you want to test a component called `Card`.

```html
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
```

In the browser, navigate to `/books/[parent]-[title]`, in our case, the route is `/book/components-parent`