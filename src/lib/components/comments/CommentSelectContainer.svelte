<script lang="ts">
	export let selectedValue: string;
	export let changeFunction: () => void;
	export let optionsArray: string[];
	export let labelTitle: string;
</script>

<div class="flex md:w-1/2 items-center my-2 md:my-5 md:mx-2 justify-center">
	<label for="typeSelect" class="w-1/4 md:1/2 text-gray-600 text-sm md:text-base"
		>{labelTitle}</label
	>
	<select
		id="typeSelect"
		bind:value={selectedValue}
		on:change={changeFunction}
		class="select ml-1 w-1/2 md:w-3/4 variant-filled-surface border-none shadow"
	>
		{#each optionsArray as o}
			<option value={o} class="font-thin text-sm">{o}</option>
		{/each}
	</select>
</div>

<style>
	select option {
		background-color: #f2f2f2;
	}
</style>
