<script lang="ts">
	import Time from "svelte-time/Time.svelte";
    export let time: Date;
</script>

<div>
	<p class="text-gray-600 font-light">
		<Time relative timestamp={time} />
	</p>
</div>
