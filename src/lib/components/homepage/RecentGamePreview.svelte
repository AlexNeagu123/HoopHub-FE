<script lang="ts">
	import type { LocalStoredGame } from '$lib/models/nba_data/games/LocalStoredGame';
	import { dateToString } from '$lib/utils/date-parser';
	import RecentGamePresentation from './RecentGamePresentation.svelte';

	export let game: LocalStoredGame;
	const strDate = dateToString(game.date);
</script>

<a
	href="/game?homeTeam={game.homeTeam.apiId}&visitorTeam={game.visitorTeam.apiId}&date={strDate}"
	class="hover:bg-primary-200 cursor-pointer shadow p-3 my-3 rounded-2xl"
>
	<RecentGamePresentation {game} />
</a>
