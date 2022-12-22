<script lang="ts">
	export let value: number;
	export let description: string;
</script>

<article
	class="col-span-2 flex flex-col gap-3 rounded-lg border-2 border-slate-400 bg-slate-500 p-8  text-slate-900"
>
	<p class="text-center text-5xl">{value}</p>
	<p class="w-full text-center text-3xl">{description}</p>
</article>
