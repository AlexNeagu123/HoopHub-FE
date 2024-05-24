<script lang="ts">
	import { getDynamicStarConfig, starRange } from '$lib/constants';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	import StarRating from '@ernane/svelte-star-rating';

	export let average: number | null = null;
	function getReviewStarConfig(score: number | null) {
		return {
			readOnly: true,
			countStars: 5,
			range: starRange,
			score: score ?? 0,
			showScore: false,
			name: '',
			starConfig: getDynamicStarConfig(score ?? 0, 25)
		};
	}
</script>

<div class="flex flex-col items-center py-2">
	<h4 class="text-gray-500 h4 font-semibold py-2">User Rating</h4>
	<StarRating config={getReviewStarConfig(average)} />
	<p class="px-3 text-gray-600 py-1 font-semibold text-lg">{average ?? '-'} / 5</p>
</div>
