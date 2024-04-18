<script lang="ts">
    import InformativePopUps from "$lib/components/shared/InformativePopUps.svelte";
    import {getInformativePopUpSettings} from "$lib/utils/pop-ups";
    import {Avatar, popup} from '@skeletonlabs/skeleton'
    import TableSkeleton from "$lib/components/shared/TableSkeleton.svelte";
    import TableHeader from "$lib/components/shared/TableHeader.svelte";
    import {AppRoute} from "$lib/constants";
    import Link from "$lib/components/shared/Link.svelte";

    export let table: { head: string[], body: any[] };
    export let hasWon: boolean[] = [];

    const numCols: number = table.head.length;
</script>

<InformativePopUps/>

<TableSkeleton>
    <TableHeader>
        {#each table.head as h, indexCol}
            {#if indexCol < numCols - 4}
                <th class="bg-surface-500 drop-shadow [&>*]:pointer-events-none cursor-default"
                    use:popup={getInformativePopUpSettings(h)}>
                    {h}
                </th>
            {/if}
        {/each}
    </TableHeader>
    <tbody>
    {#each table.body as rowValues, indexRow}
        <tr>
            {#each rowValues as rowVal, indexCol}
                {#if indexCol < numCols - 4}
                    <td class="bg-surface-500 shadow">
                        {#if indexCol === 1}
                            <div class="flex justify-start">
                                <Avatar width="w-[30px]" rounded="rounded-full" background="bg-transparent"
                                        src={table.body[indexRow][numCols - 4]}/>
                                <Link href="{AppRoute.TEAM}/{table.body[indexRow][numCols - 3]}" styles="px-2">
                                    {rowVal}
                                </Link>
                            </div>
                        {:else if indexCol === 0}
                            <Link href="{AppRoute.GAME}?homeTeam={table.body[indexRow][numCols - 2]}&visitorTeam={table.body[indexRow][numCols - 1]}&date={rowVal}">
                                {rowVal}
                            </Link>
                        {:else}
                            <span class="{hasWon[indexRow] === true ? 'font-semibold' : 'opacity-80'}">
                        {rowVal}
                        </span>
                        {/if}
                    </td>
                {/if}
            {/each}
        </tr>
    {/each}
    </tbody>
</TableSkeleton>