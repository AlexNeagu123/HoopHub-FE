<script lang="ts">
    import {standingsAvailableSeasons, standingsGroups} from "$lib/constants";

    export let season;
    export let group;

    let selectedGroupIndex = 0;
    let selectedSeasonIndex = 0;

    function updateStandingsSeason(newSeason: string) {
        season = newSeason;
    }

    function updateStandingsGroup(newGroup: string) {
        group = newGroup;
    }
</script>

<div class="flex justify-center">
    <div class="card variant-filled-surface m-10 w-5/6 p-3 px-10 shadow">
        <h3 class="h4 font-semibold text-primary-800 p-2 border-b-2 border-b-primary-300">{season} Regular Season
            Standings</h3>
        <div class="flex justify-start my-5">
            <div class="w-1/5">
                <label for="season-select" class="font-semibold m-2">Season</label>
                <select bind:value={selectedSeasonIndex}
                        on:change={() => updateStandingsSeason(standingsAvailableSeasons[selectedSeasonIndex])}
                        class="select variant-filled-surface border-none shadow" id="season-select">
                    {#each standingsAvailableSeasons as season, index}
                        <option value={index} class="font-thin text-sm">{season}</option>
                    {/each}
                </select>
            </div>
            <div class="w-1/5 mx-5">
                <label for="season-select" class="font-semibold m-2">Group By</label>
                <select bind:value={selectedGroupIndex}
                        on:change={() => updateStandingsGroup(standingsGroups[selectedGroupIndex])}
                        class="select variant-filled-surface border-none shadow" id="season-select">
                    {#each standingsGroups as group, index}
                        <option value={index} class="font-thin text-sm">{group}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
</div>
