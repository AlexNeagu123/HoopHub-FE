<script lang="ts">
	import type { LocalStoredBoxScoresDto } from '$lib/models/nba_data/box-scores/LocalStoredBoxScores';
	import { isGoodGame } from '$lib/utils/game-stats';
	import BoxScorePreview from './BoxScorePreview.svelte';
	import CarouselBase from './CarouselBase.svelte';

	export let boxScores: LocalStoredBoxScoresDto[] = [];
	const title = 'Impressive Performances';
</script>

<CarouselBase {title}>
	{#each boxScores as boxScore}
		{#if isGoodGame(boxScore)}
			<BoxScorePreview {boxScore} />
		{/if}
	{/each}
</CarouselBase>
