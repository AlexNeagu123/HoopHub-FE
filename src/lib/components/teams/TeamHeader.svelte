<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Team } from '$lib/models/nba_data/teams/Team';

	export let team: Team;
</script>

<div class="flex w-1/2">
	<div class="inline">
		<Avatar src={team.imageUrl} width="w-36" rounded="rounded-lg" background="bg-transparent" />
	</div>

	<div class="inline ml-3">
		<header class="card-header h2">{team.fullName}</header>
		<header class="card-header h3">
			<span class="text-semibold"
				>{team.teamBio[0].winCount}
				- {team.teamBio[0].lossCount}</span
			>
			<span class="text-gray-400">{team.teamBio[0].finish}</span>
		</header>
	</div>
</div>
