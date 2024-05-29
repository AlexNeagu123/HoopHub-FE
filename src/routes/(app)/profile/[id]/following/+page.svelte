<script lang="ts">
	import type { PageData } from './$types';
	import FanProfile from '$lib/components/fans/FanProfile.svelte';

	export let data: PageData;
	import { FollowingPageTypes, ProfilePageTypes } from '$lib/constants';
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';
	import type { TeamFollowEntry } from '$lib/models/user_features/followings/TeamFollowEntry';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import type { Player } from '$lib/models/nba_data/players/Player';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import FollowedPlayersList from '$lib/components/followings/FollowedPlayersList.svelte';
	import FollowedTeamsList from '$lib/components/followings/FollowedTeamsList.svelte';

	let playerFollows: PlayerFollowEntry[] = data.pagePlayerFollows;
	let teamFollows: TeamFollowEntry[] = data.pageTeamFollows;
	let availableTeams: Team[] = data.availableTeams;
	let activePlayers: Player[] = data.allActivePlayers;

	let selectedType = FollowingPageTypes.TEAMS;

	function toggleSelectedType() {
		selectedType =
			selectedType === FollowingPageTypes.PLAYERS
				? FollowingPageTypes.TEAMS
				: FollowingPageTypes.PLAYERS;
	}
</script>

<FanProfile
	profilePageInfo={data.profilePageInfo}
	ownInfo={data.fanInfo}
	profilePageType={ProfilePageTypes.FOLLOWING}
>
	<div class="w-full my-5">
		<TabGroup
			justify="justify-center"
			border="none"
			active="hover:bg-primary-500 bg-primary-500"
			hover="hover:bg-primary-500"
			rounded="rounded-full"
		>
			<TabAnchor
				selected={selectedType === FollowingPageTypes.PLAYERS}
				on:click={toggleSelectedType}>Players</TabAnchor
			>
			<TabAnchor selected={selectedType === FollowingPageTypes.TEAMS} on:click={toggleSelectedType}
				>Teams</TabAnchor
			>
		</TabGroup>

		{#if selectedType === FollowingPageTypes.PLAYERS}
			<FollowedPlayersList {playerFollows} {activePlayers} />
		{:else}
			<FollowedTeamsList {teamFollows} {availableTeams} />
		{/if}
	</div>
</FanProfile>
