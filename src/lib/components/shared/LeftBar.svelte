<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppRoute, SeasonConstants } from '$lib/constants';
	import { seasonFromIntToStr } from '$lib/utils/standings-utils';
	export let hamburgerOpen: boolean = false;

	function navigateTo(url: string) {
		hamburgerOpen = false;
		goto(url);
	}
</script>

{#if hamburgerOpen}
	<div class="fixed top-35 left-0 w-full h-full bg-white flex flex-col z-50">
		<button
			type="button"
			on:click={() => navigateTo(AppRoute.HOME)}
			class="text-center btn bg-surface-400 rounded-none"
		>
			<span class="text-xl"> Home </span>
		</button>
		<button
			type="button"
			on:click={() => navigateTo(AppRoute.TEAMS)}
			class="text-center btn bg-surface-400 text-xl rounded-none"
		>
			Teams
		</button>
		<button
			type="button"
			on:click={() => navigateTo(AppRoute.GAMES)}
			class="text-center btn bg-surface-400 text-xl rounded-none"
		>
			Games
		</button>
		<button
			type="button"
			on:click={() =>
				navigateTo(
					`${AppRoute.STANDINGS}?season=${seasonFromIntToStr(SeasonConstants.currentSeason)}`
				)}
			class="text-center btn bg-surface-400 text-xl rounded-none"
		>
			Standings
		</button>
		<button
			type="button"
			on:click={() =>
				navigateTo(
					`${AppRoute.PLAYOFFS}?season=${seasonFromIntToStr(SeasonConstants.currentSeason)}`
				)}
			class="text-center btn bg-surface-400 text-xl rounded-none"
		>
			Playoffs
		</button>
	</div>
{/if}
