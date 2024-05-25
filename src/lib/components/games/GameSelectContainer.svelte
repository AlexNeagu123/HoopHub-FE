<script lang="ts">
    export let selectedValue: number
    export let changeFunction: () => void;
    export let optionsArray: string[];
    export let labelTitle: string;
</script>

<div class="flex w-1/4 items-center mx-10">
    <label for="sortSelect" class="w-[30%] mr-2 text-gray-600">{labelTitle}</label>
    <select
        id="sortSelect"
        bind:value={selectedValue}
        on:change={changeFunction}
        class="select w-[70%] variant-filled-surface border-none shadow"
    >
        {#each optionsArray as o, index}
            <option value={index} class="font-thin text-sm">{o}</option>
        {/each}
    </select>
</div>

<style>
	select option {
		background-color: #f2f2f2;
	}
</style>
