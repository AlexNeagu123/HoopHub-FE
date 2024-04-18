<script lang="ts">
    import {getInformativePopUpSettings} from "$lib/utils/pop-ups.js";
    import {Avatar, popup} from '@skeletonlabs/skeleton';
    import InformativePopUps from "$lib/components/shared/InformativePopUps.svelte";
    import {AppRoute} from "$lib/constants";
    import TableSkeleton from "$lib/components/shared/TableSkeleton.svelte";
    import TableHeader from "$lib/components/shared/TableHeader.svelte";

    export let table: { head: string[], body: any[] };
    const columnCount = table.head.length;
</script>

<InformativePopUps/>

<TableSkeleton>
    <TableHeader>
        {#each table.head as h, index}
            {#if index < columnCount - 2}
                <th class="bg-surface-500 [&>*]:pointer-events-none cursor-default drop-shadow"
                    use:popup={getInformativePopUpSettings(h)}>
                    {h}
                </th>
            {/if}
        {/each}
    </TableHeader>
    <tbody>
    {#each table.body as rowValues, rowIndex}
        <tr>
            {#each rowValues as rowVal, colIndex}
                {#if colIndex < columnCount - 2}
                    <td class="bg-surface-500 shadow">
                        <div class="flex justify-start items-center">
                            {#if colIndex === 0}
                                <span class="font-bold p-2">{rowIndex + 1}</span>
                                <Avatar width="w-[10%]" rounded="rounded-full" background="bg-transparent"
                                        src={table.body[rowIndex][columnCount - 1]}/>
                            {/if}
                            <p class='{colIndex === 0 ? "pl-2" : "pl-0"}'>
                                {#if colIndex === 0}
                                    <a class="cursor-pointer text-secondary-700 hover:text-blue-600 font-semibold"
                                       href="{AppRoute.TEAM}/{table.body[rowIndex][columnCount - 2]}">
                                        {rowVal}
                                    </a>
                                {:else}
                                    {rowVal}
                                {/if}
                            </p>
                        </div>
                    </td>
                {/if}
            {/each}
        </tr>
    {/each}
    </tbody>
</TableSkeleton>
