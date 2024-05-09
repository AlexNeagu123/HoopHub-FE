<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let team: Team;
</script>

<a class="px-2 flex justify-start hover:underline" href="{AppRoute.TEAM}/{team.id}">
	<Avatar src={team.imageUrl} width="w-5" background="bg-transparent" />
	<h6 class="h6 px-1 font-semibold">
		{team.fullName}
	</h6>
</a>
