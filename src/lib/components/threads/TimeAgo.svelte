<script lang="ts">
	import Time from 'svelte-time/Time.svelte';
	export let time: Date;
</script>

<div class="flex items-center">
	<p class="text-gray-600 font-light text-sm">
		<Time relative timestamp={time} />
	</p>
</div>
