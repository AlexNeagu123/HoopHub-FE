<script lang="ts">
	import type { LocalStoredGame } from '$lib/models/nba_data/games/LocalStoredGame';
	import CarouselBase from './CarouselBase.svelte';
	import RecentGamePreview from './RecentGamePreview.svelte';

	export let recentGames: LocalStoredGame[];
	const title = 'Recent Games';
</script>

<CarouselBase {title}>
	{#each recentGames as game}
		<RecentGamePreview {game} />
	{/each}
</CarouselBase>
