<script lang="ts">
    import {AppRoute, TableTypes} from "$lib/constants";
    import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";
    import {Avatar} from "@skeletonlabs/skeleton";

    export let table: { head: string[], body: any[] };
    export let tableType: TableTypes;
    export let teamIds: string[] = [];
    export let playersInfo: BoxScorePlayer[] = [];
</script>

<section class="mt-5">
    <div class="table-container">
        <table class="table">
            <thead>
            <tr>
                {#each table.head as h}
                    <th class="bg-primary-500 drop-shadow">{h}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each table.body as rowValues, indexRow}
                <tr>
                    {#each rowValues as rowVal, indexCol}
                        {#if tableType === TableTypes.teamTable && rowValues[rowValues.length - 1] === 'Won Finals'}
                            <td class="bg-yellow-100 shadow text-center">{rowVal}</td>
                        {:else if tableType === TableTypes.playerTable && table.head[indexCol] === 'Team'}
                            <td class="bg-primary-500 shadow underline text-blue-500 hover:text-blue-600 visited:text-purple-600 font-bold text-center">
                                <a href="{AppRoute.TEAM}/{teamIds[indexRow]}">{rowVal}</a>
                            </td>
                        {:else if tableType === TableTypes.boxScoreType && table.head[indexCol] === 'Player'}
                            <td class="bg-primary-500 shadow text-blue-400 hover:text-blue-600 visited:text-purple-600 font-semibold">
                                <div class="flex justify-start items-center">
                                    <Avatar width="w-1/5" rounded="rounded-full" background="bg-transparent"
                                            src={playersInfo[indexRow].player.imageUrl}/>
                                    <a class="ml-3" href="/player/{playersInfo[indexRow].player.id}">{rowVal}</a>
                                </div>
                            </td>
                        {:else}
                            <td class="bg-primary-500 shadow text-center">
                                {rowVal}
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</section>