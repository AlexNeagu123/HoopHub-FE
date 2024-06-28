<script lang="ts">
	export let selectedValue: number;
	export let changeFunction: () => void;
	export let optionsArray: string[];
	export let labelTitle: string;
</script>

<div class="flex md:w-1/4 w-[45%] items-center md:mx-10 flex-col md:flex-row">
	<label for="sortSelect" class="md:w-[30%] w-full text-center my-2 md:my-0 md:mr-2 text-gray-600 text-xs mr-1">{labelTitle}</label>
	<select
		id="sortSelect"
		bind:value={selectedValue}
		on:change={changeFunction}
		class="select w-full md:w-[70%] variant-filled-surface border-none shadow"
	>
		{#each optionsArray as o, index}
			<option value={index} class="font-thin text-xs md:text-sm">{o}</option>
		{/each}
	</select>
</div>

<style>
	select option {
		background-color: #f2f2f2;
	}
</style>
