<script lang="ts">
	export let value: number;
	export let description: string;
</script>

<article
	class="
	col-span-2
	flex
	w-72
	flex-col 
	gap-3
	rounded-lg
	border-2
	border-slate-700
	bg-slate-900 
	p-8 
	text-slate-400"
>
	<p class="text-center text-5xl">{value}</p>
	<p class="w-full text-center text-lg md:text-2xl lg:text-3xl">{description}</p>
</article>
