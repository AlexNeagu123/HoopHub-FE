<script lang="ts">
	import type { PageData } from './$types';
	import TeamExpanded from '$lib/components/teams/TeamExpanded.svelte';
	import PlayerPreview from '$lib/components/players/PlayerPreview.svelte';
	import { TeamPageTypes } from '$lib/constants';

	export let data: PageData;
	let teamFollows = data.teamFollows;
</script>

<TeamExpanded team={data.team} pageType={TeamPageTypes.ROSTER} {teamFollows}>
	<section>
		<div class="flex flex-col md:flex-row justify-between items-center md:flex-wrap">
			{#each data.team.players as player}
				<PlayerPreview {player} />
			{/each}
		</div>
	</section>
</TeamExpanded>
