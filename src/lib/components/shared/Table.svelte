<script lang="ts">
	import { AppRoute, TableTypes } from '$lib/constants';
	import type { BoxScorePlayer } from '$lib/models/nba_data/box-scores/BoxScorePlayer';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import { getInformativePopUpSettings } from '$lib/utils/pop-ups';
	import InformativePopUps from '$lib/components/shared/InformativePopUps.svelte';
	import TableSkeleton from '$lib/components/shared/TableSkeleton.svelte';
	import TableHeader from '$lib/components/shared/TableHeader.svelte';
	import type { AdvancedStatsEntry } from '$lib/models/nba_data/box-scores/AdvancedStatsEntry';

	export let table: { head: string[]; body: any[] };
	export let tableType: TableTypes;
	export let teamIds: string[] = [];
	export let playersInfo: BoxScorePlayer[] | AdvancedStatsEntry[] = [];
	export let playersUpdates: boolean[][] = [];
</script>

<InformativePopUps />

<TableSkeleton>
	<TableHeader>
		{#each table.head as h}
			<th
				class="whitespace-nowrap bg-surface-500 drop-shadow [&>*]:pointer-events-none cursor-default text-xs"
				use:popup={getInformativePopUpSettings(h)}
			>
				{h}
			</th>
		{/each}
	</TableHeader>
	<tbody>
		{#each table.body as rowValues, indexRow}
			<tr>
				{#each rowValues as rowVal, indexCol}
					{#if tableType === TableTypes.teamTable && rowValues[rowValues.length - 1] === 'Won Finals'}
						<td class="!text-sm bg-yellow-100 shadow text-center">{rowVal}</td>
					{:else if tableType === TableTypes.playerTable && table.head[indexCol] === 'Team'}
						<td
							class="!text-sm bg-surface-500 shadow underline text-secondary-700 hover:text-blue-600 visited:text-purple-600 font-bold text-center
                            whitespace-nowrap"
						>
							<a href="{AppRoute.TEAM}/{teamIds[indexRow]}">{rowVal}</a>
						</td>
					{:else if tableType === TableTypes.boxScoreType && table.head[indexCol] === 'Player'}
						<td
							class="!text-sm bg-surface-500 shadow text-secondary-700 hover:text-blue-600 visited:text-purple-600 font-semibold"
						>
							<div class="flex justify-start items-center whitespace-nowrap">
								<Avatar
									width="w-10"
									rounded="rounded-full"
									background="bg-transparent"
									src={playersInfo[indexRow].player?.imageUrl}
								/>
								<a class="ml-3" href="/player/{playersInfo[indexRow].player?.id}">{rowVal}</a>
							</div>
						</td>
					{:else if tableType === TableTypes.boxScoreType}
						<td
							class="!text-sm {playersUpdates[indexRow][indexCol - 1]
								? 'bg-surface-300 transition-colors duration-1000 ease-in-out'
								: 'bg-surface-500'} shadow text-center"
						>
							{rowVal}
						</td>
					{:else}
						<td class="bg-surface-500 shadow text-center !whitespace-nowrap !text-sm">
							{rowVal}
						</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</TableSkeleton>
