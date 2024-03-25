<script lang="ts">
    import {tableMapperValues} from "@skeletonlabs/skeleton";
    import type {TeamBio} from "$lib/models/nba_data/teams/TeamBio";

    export let teamBio: TeamBio[];
    $: tableSimple = {
        head: ['Season', 'W', 'L', 'W-L %', 'Finish', 'Srs', 'Pace', 'RelPace', 'ORtg', 'DRtg', 'Playoffs'],
        body: tableMapperValues(teamBio, ['season', 'winCount', 'lossCount', 'winLossRatio', 'finish',
            'srs', 'pace', 'relPace', 'oRtg', 'dRtg', 'playoffs']),
    };
</script>

<section class="mt-5">
    <div class="table-container">
        <table class="table">
            <thead>
            <tr>
                {#each tableSimple.head as h}
                    <th class="bg-primary-500 drop-shadow">{h}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each tableSimple.body as rowValues}
                <tr>
                    {#each rowValues as rowVal}
                        {#if rowValues[rowValues.length - 1] === 'Won Finals'}
                            <td class="bg-yellow-100 shadow">{rowVal}</td>
                        {:else}
                            <td class="bg-primary-500 shadow">{rowVal}</td>
                        {/if}
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</section>