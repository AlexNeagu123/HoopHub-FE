<script lang="ts">
    import {standingsAvailableSeasons} from "$lib/constants";

    export let season;
    export let seasonChangeCallback;

    let selectedSeasonIndex = 1;

    async function updatePlayoffsSeason(newSeason: string) {
        season = newSeason;
        await seasonChangeCallback();
    }
</script>

<div class="flex justify-center">
    <div class="card variant-filled-surface mx-10 mt-10 w-5/6 p-3 px-10 shadow">
        <h3 class="h4 font-semibold text-primary-800 p-2 border-b-2 border-b-primary-300">{season} Playoff Bracket</h3>
        <div class="flex justify-start my-5">
            <div class="w-1/5">
                <label for="season-select" class="font-semibold m-2">Season</label>
                <select bind:value={selectedSeasonIndex}
                        on:change={async () => await updatePlayoffsSeason(standingsAvailableSeasons[selectedSeasonIndex])}
                        class="select variant-filled-surface border-none shadow" id="season-select">
                    {#each standingsAvailableSeasons as season, index}
                        <option value={index} class="font-thin text-sm">{season}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
</div>
