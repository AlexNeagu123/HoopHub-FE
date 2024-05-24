<script lang="ts">
	export let title: string;
	export let content: string;
</script>

<div class="flex items-center w-1/3 card variant-filled-surface drop-shadow">
	<span class="flex-auto">
		<dt class="text-gray-500">{title}</dt>
		<dd class="font-semibold">{content}</dd>
	</span>
</div>
