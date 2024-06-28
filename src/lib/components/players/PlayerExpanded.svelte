<script lang="ts">
	import { Avatar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { Player } from '$lib/models/nba_data/players/Player';
	import type { SeasonAverageStats } from '$lib/models/nba_data/players/SeasonAverageStats';
	import PlayerHeader from '$lib/components/players/PlayerHeader.svelte';
	import PlayerStat from '$lib/components/players/PlayerStat.svelte';
	import PlayerCompoundStat from '$lib/components/players/PlayerCompoundStat.svelte';
	import { AppRoute } from '$lib/constants';
	import { page } from '$app/stores';
	import AverageRatingBox from './AverageRatingBox.svelte';
	import FollowPlayerBox from './FollowPlayerBox.svelte';
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';

	export let player: Player;
	export let pageType: string;
	export let playerFollows: PlayerFollowEntry[] = [];

	$: isLatest = pageType == 'latest';
	let playerStats: SeasonAverageStats = player.seasonAverageStats[0];
	let id = $page.params.id;
</script>

<div class="flex justify-center">
	<div class="card variant-filled-surface m-10 w-full last:md:w-2/3 md:p-t-5 md:px-10 drop-shadow">
		<div class="md:mt-4 flex justify-between">
			<div class="flex justify-start w-2/3">
				<div class="w-1/2 md:w-1/3 drop-shadow">
					<a href="/team/{playerStats.team.id}" class="w-1/2 md:w-1/3 block">
						<Avatar
							width="w-full"
							rounded="rounded-lg"
							background="bg-transparent"
							src={playerStats.team.imageUrl}
						/>
					</a>
					<div class="w-36 md:w-52">
						<img class="drop-shadow w-full bg-transparent" alt="AB" src={player.imageUrl} />
					</div>
				</div>
				<PlayerHeader {player} {playerStats} />
			</div>
			<div class="flex flex-col md:items-start items-end justify-start w-[47%] md:w-1/5">
				<FollowPlayerBox
					{playerFollows}
					playerName={`${player.firstName} ${player.lastName}`}
					playerId={player.id}
				/>
				<AverageRatingBox
					average={player.averageRating ? Number(player.averageRating?.toFixed(1)) : null}
				/>
			</div>
		</div>
		<div class="flex w-full justify-center">
			<div class="container flex flex-wrap md:justify-start md:w-full w-[95%]">
				<div class="flex w-1/2 md:w-1/3">
					<PlayerStat isLast={false} title="PPG" content={playerStats.pts.toFixed(1)} />
					<PlayerStat isLast={false} title="APG" content={playerStats.ast.toFixed(1)} />
					<PlayerStat
						isLast={false}
						title="RPG"
						content={(playerStats.oreb + playerStats.dreb).toFixed(1)}
					/>
					<PlayerStat isLast={false} title="MIN" content={playerStats.min} />
				</div>
				<div class="flex w-1/2 md:w-2/3">
					<PlayerCompoundStat
						isLast={false}
						titles={['BLK', 'STL']}
						contents={[`${playerStats.blk.toFixed(1)}`, `${playerStats.stl.toFixed(1)}`]}
					/>
					<PlayerCompoundStat
						isLast={false}
						titles={['FG', 'FG3M']}
						contents={[playerStats.fgm.toFixed(1), playerStats.fg3m.toFixed(1)]}
					/>
					<PlayerCompoundStat
						isLast={false}
						titles={['Height', 'Weight']}
						contents={[`${player.height}ft`, `${player.weight}lb`]}
					/>
					<PlayerCompoundStat
						isLast={true}
						titles={['College', 'Country']}
						contents={[player.college, player.country]}
					/>
				</div>
			</div>
		</div>
		<div class="mt-3 flex justify-center md:justify-start">
			<TabGroup
				border="none"
				justify="justify-start"
				active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
				hover="hover:bg-secondary-500"
			>
				<TabAnchor href="{AppRoute.PLAYER}/{id}" selected={isLatest}>Latest</TabAnchor>
				<TabAnchor href="{AppRoute.PLAYER}/{id}/bio" selected={!isLatest}>History</TabAnchor>
			</TabGroup>
		</div>
		<div class="mt-3">
			<slot />
		</div>
	</div>
</div>
