<script lang="ts">
    import {AppRoute, TableTypes} from "$lib/constants";
    export let table: { head: string[], body: any[] };
    export let tableType: TableTypes;
    export let teamIds: string[] = [];
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
                            <td class="bg-yellow-100 shadow">{rowVal}</td>
                        {:else if tableType === TableTypes.playerTable && table.head[indexCol] === 'Team'}
                            <td class="bg-primary-500 shadow underline text-blue-500 hover:text-blue-600 visited:text-purple-600 font-bold">
                                <a href="{AppRoute.TEAM}/{teamIds[indexRow]}">{rowVal}</a>
                            </td>
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