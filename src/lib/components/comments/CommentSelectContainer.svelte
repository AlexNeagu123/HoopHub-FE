<script lang="ts">
	export let selectedValue: string;
	export let changeFunction: () => void;
	export let optionsArray: string[];
	export let labelTitle: string;
</script>

<div class="flex w-1/2 items-center my-5 mx-2 justify-around">
	<label for="typeSelect" class="w-1/3 text-gray-600">{labelTitle}</label>
	<select
		id="typeSelect"
		bind:value={selectedValue}
		on:change={changeFunction}
		class="select w-3/4 variant-filled-surface border-none shadow"
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
