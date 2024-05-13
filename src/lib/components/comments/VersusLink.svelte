<script lang="ts">
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let homeTeam: Team;
	export let visitorTeam: Team;
</script>

{#if homeTeam && visitorTeam}
	<div class="flex">
		<Avatar src={visitorTeam.imageUrl} width="w-5" background="bg-transparent" />
		<p class="px-1">vs</p>
		<Avatar src={homeTeam.imageUrl} width="w-5" background="bg-transparent" />
	</div>
{/if}
