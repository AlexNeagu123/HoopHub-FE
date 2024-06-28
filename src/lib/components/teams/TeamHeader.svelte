<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Team } from '$lib/models/nba_data/teams/Team';

	export let team: Team;
</script>

<div class="flex justify-center w-full md:justify-start md:w-1/2">
	<div class="flex ustify-center">
		<Avatar
			src={team.imageUrl}
			width="w-28 md:w-36"
			rounded="rounded-lg"
			background="bg-transparent"
		/>
	</div>

	<div class="inline md:ml-3">
		<header class="card-header h3 md:h2">{team.fullName}</header>
		<header class="card-header h4 md:h3">
			<span class="text-semibold"
				>{team.teamBio[0].winCount}
				- {team.teamBio[0].lossCount}</span
			>
			<span class="text-gray-400">{team.teamBio[0].finish}</span>
		</header>
	</div>
</div>
