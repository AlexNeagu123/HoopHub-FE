<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import type { LocalStoredBoxScoresDto } from '$lib/models/nba_data/box-scores/LocalStoredBoxScores';
	import PlayerStat from '../players/PlayerStat.svelte';
	export let boxScore: LocalStoredBoxScoresDto;

	const player = boxScore.player;
</script>

<div class="flex justify-center">
	<a
		class="variant-filled-surface md:m-3 w-full md:w-3/4 p-5 shadow hover:bg-primary-200 cursor-pointer"
		href="{AppRoute.PLAYER}/{player.id}"
	>
		<div class="mt-1 w-full flex">
			<div class="w-1/4 drop-shadow">
				<div class="w-full">
					<img class="drop-shadows w-full bg-transparent" alt="AB" src={player.imageUrl} />
				</div>
			</div>
			<div class="ml-2">
				<p class="text-gray-600">
					<span class="pr-4">{boxScore.team.fullName}</span>
					<span class="pr-4">#{player.jerseyNumber}</span>
					{player.position}
				</p>
				<p class="h2 font-semibold">{player.firstName}</p>
				<p class="h2 font-semibold">{player.lastName}</p>
			</div>
		</div>
		<div class="container flex flex-wrap justify-start w-full">
			<div class="flex w-full h-20">
				<PlayerStat isLast={false} title="MIN" content={boxScore.min ?? '0'} />
				<PlayerStat isLast={false} title="PPG" content={boxScore.pts} />
				<PlayerStat isLast={false} title="APG" content={boxScore.ast} />
				<PlayerStat isLast={false} title="RPG" content={boxScore.reb} />
				<PlayerStat isLast={false} title="BLK" content={boxScore.blk} />
				<PlayerStat isLast={false} title="STL" content={boxScore.stl} />
				<PlayerStat isLast={false} title="FG%" content={(boxScore.fgPct * 100).toFixed(1)} />
				<PlayerStat isLast={true} title="FG3%" content={(boxScore.fg3Pct * 100).toFixed(1)} />
			</div>
		</div>
	</a>
</div>
