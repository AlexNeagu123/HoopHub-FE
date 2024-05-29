<script lang="ts">
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import type { TeamFollowEntry } from '$lib/models/user_features/followings/TeamFollowEntry';
	import FollowedTeamPreview from './FollowedTeamPreview.svelte';

	export let teamFollows: TeamFollowEntry[];
	export let availableTeams: Team[];

	function getTeamById(id: string): Team {
		return availableTeams.find((team) => team.id === id) ?? availableTeams[0];
	}
</script>

<div class="flex justify-center flex-col items-center">
	{#each teamFollows as teamFollow}
		<div class="w-full flex justify-center my-5">
			<FollowedTeamPreview team={getTeamById(teamFollow.teamId)} />
		</div>
	{/each}
</div>
