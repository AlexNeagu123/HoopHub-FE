<script lang="ts">
	import { informativePopUps } from '$lib/constants';
</script>

{#each Object.keys(informativePopUps) as title}
	<div class="card p-4 variant-filled-tertiary text-gray-600 text-sm z-10" data-popup={title}>
		<p>{informativePopUps[title]}</p>
		<div class="arrow variant-filled-tertiary" />
	</div>
{/each}
