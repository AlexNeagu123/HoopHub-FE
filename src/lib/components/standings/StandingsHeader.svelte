<script lang="ts">
	import { standingsAvailableSeasons, standingsGroups } from '$lib/constants';

	export let season;
	export let group;
	export let seasonChangeCallback;

	let selectedGroupIndex = 0;
	let selectedSeasonIndex = 0;

	async function updateStandingsSeason(newSeason: string) {
		season = newSeason;
		await seasonChangeCallback();
	}

	function updateStandingsGroup(newGroup: string) {
		group = newGroup;
	}
</script>

<div class="flex justify-center">
	<div
		class="card variant-filled-surface md:m-10 my-3 w-full md:w-5/6 p-3 px-10 shadow flex justify-center flex-col"
	>
		<h3 class="h4 font-semibold text-primary-800 p-2 border-b-2 border-b-primary-300">
			{season} Regular Season Standings
		</h3>
		<div class="flex justify-start my-5">
			<div class="md:w-1/5">
				<label for="season-select" class="font-semibold m-2">Season</label>
				<select
					bind:value={selectedSeasonIndex}
					on:change={async () =>
						await updateStandingsSeason(standingsAvailableSeasons[selectedSeasonIndex])}
					class="select variant-filled-surface border-none shadow"
					id="season-select"
				>
					{#each standingsAvailableSeasons as season, index}
						<option value={index} class="font-thin text-sm">{season}</option>
					{/each}
				</select>
			</div>
			<div class="md:w-1/5 mx-5">
				<label for="season-select" class="font-semibold m-2">Group By</label>
				<select
					bind:value={selectedGroupIndex}
					on:change={() => updateStandingsGroup(standingsGroups[selectedGroupIndex])}
					class="select variant-filled-surface border-none shadow"
					id="season-select"
				>
					{#each standingsGroups as group, index}
						<option value={index} class="font-thin text-sm">{group}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>
