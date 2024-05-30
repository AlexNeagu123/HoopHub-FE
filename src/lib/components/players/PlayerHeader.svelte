<script lang="ts">
	import type { Player } from '$lib/models/nba_data/players/Player';
	import type { SeasonAverageStats } from '$lib/models/nba_data/players/SeasonAverageStats';

	export let player: Player;
	export let playerStats: SeasonAverageStats;
</script>

<div class="mt-5 ml-2">
	<p class="text-gray-600 font-semibold">
		<span class="pr-4">{playerStats.team.fullName}</span>
		<span class="pr-4">#{player.jerseyNumber}</span>
		{player.position}
	</p>
	<p class="h1 font-semibold">{player.firstName}</p>
	<p class="h1 font-semibold">{player.lastName}</p>
</div>
