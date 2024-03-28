<script lang="ts">
    import {TableTypes} from "$lib/constants";

    export let table: { head: string[], body: any[] };
    export let tableType: TableTypes;
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
            {#each table.body as rowValues}
                <tr>
                    {#each rowValues as rowVal}
                        {#if tableType === TableTypes.teamTable && rowValues[rowValues.length - 1] === 'Won Finals'}
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