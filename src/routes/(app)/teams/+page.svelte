<script lang="ts">
	import TeamPreview from '$lib/components/teams/TeamPreview.svelte';
	import type { PageData } from './$types';
	import { Autocomplete, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { Team } from '$lib/models/nba_data/teams/Team';

	export let data: PageData;
	let value: string = 'East';

	let elemTeams: HTMLDivElement;

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	$: teamOptions = data.teams
		.filter((team) => team.conference === value)
		.map((team) => ({
			label: team.fullName,
			value: team.id
		}));

	$: teamsDisplayed = searchedTeam
		? [searchedTeam]
		: data.teams.filter((team) => team.conference === value);

	let searchedTeam: Team | null = null;
	let inputTeamSearch: string = '';

	function multiColumnLeft(): void {
		let x = elemTeams.scrollWidth;
		if (elemTeams.scrollLeft !== 0) x = elemTeams.scrollLeft - elemTeams.clientWidth;
		elemTeams.scroll(x, 0);
	}

	function multiColumnRight(): void {
		let x = 0;
		if (elemTeams.scrollLeft < elemTeams.scrollWidth - elemTeams.clientWidth - 1)
			x = elemTeams.scrollLeft + elemTeams.clientWidth;
		elemTeams.scroll(x, 0);
	}

	function onTeamSelect(event: CustomEvent<AutocompleteOption<string>>) {
		inputTeamSearch = event.detail.label;
		searchedTeam = data.teams.filter((team) => team.id === event.detail.value)[0];
	}

	function onKeyPress() {
		searchedTeam = null;
	}
</script>

<div class="flex w-full md:justify-center mt-5 shadow py-7">
	<div class="container ml-5 w-full md:w-1/3">
		<input
			class="shadow variant-filled-surface
                autocomplete w-3/4 md:w-1/2 placeholder-black rounded-full border border-primary-600
                text-sm md:text-base
                focus:outline-0 focus:border-primary-600 focus:ring-0"
			type="search"
			name="autocomplete-search"
			bind:value={inputTeamSearch}
			placeholder="Search Team.."
			use:popup={popupSettings}
			on:keydown={onKeyPress}
		/>
		<div
			data-popup="popupAutocomplete"
			class="font-semibold p-2 rounded-md text-xs variant-filled-tertiary"
		>
			<Autocomplete
				bind:input={inputTeamSearch}
				options={teamOptions}
				on:selection={onTeamSelect}
			/>
		</div>
	</div>

	<div class="flex justify-center w-1/3">
		<RadioGroup
			gap="gap-5"
			border="none"
			background="variant-filled-surface"
			active="variant-filled-primary"
			hover="hover:variant-filled-primary"
		>
			<RadioItem bind:group={value} name="conference" value="East">East</RadioItem>
			<RadioItem bind:group={value} name="conference" value="West">West</RadioItem>
		</RadioGroup>
	</div>

	<div class="w-1/3"></div>
</div>

<div class="h-[75%] w-full flex flex-col items-center justify-center">
	<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center w-[85%]">
		<button type="button" class="btn-icon variant-filled-primary" on:click={multiColumnLeft}>
			<i class="fa-solid fa-arrow-left text-surface-400" />
		</button>
		<div
			bind:this={elemTeams}
			class="snap-mandatory scroll-smooth flex gap-2 pb-2 overflow-x-auto justify-evenly"
		>
			{#each teamsDisplayed as team}
				<TeamPreview {team} />
			{/each}
		</div>
		<button type="button" class="btn-icon variant-filled-primary" on:click={multiColumnRight}>
			<i class="fa-solid fa-arrow-right text-surface-400" />
		</button>
	</div>
</div>
