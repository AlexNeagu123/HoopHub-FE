<script lang="ts">
	import InformativePopUps from '$lib/components/shared/InformativePopUps.svelte';
	export let title: string;
	export let content: number | string;
	export let isLast: boolean;
</script>

<InformativePopUps />

<div
	class:border-r-primary-600={isLast}
	class:border-r-2={isLast}
	class="flex flex-col text-center justify-center w-full hover:bg-primary-600
     border-l-2 border-l-primary-600
     border-b-2 border-b-primary-600 border-t-2 border-t-primary-600 shadow cursor-default"
>
	<dt class="text-gray-500 md:text-base text-sm">{title}</dt>
	<dd class="font-semibold md:text-base text-sm">{content}</dd>
</div>
