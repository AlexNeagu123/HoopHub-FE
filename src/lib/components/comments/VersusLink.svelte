<script lang="ts">
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let homeTeam: Team | null;
	export let visitorTeam: Team | null;
</script>

{#if homeTeam && visitorTeam}
	<div class="flex items-center">
		<Avatar src={visitorTeam.imageUrl} width="w-5" background="bg-transparent" />
		<p class="px-1">vs</p>
		<Avatar src={homeTeam.imageUrl} width="w-5" background="bg-transparent" />
	</div>
{/if}
