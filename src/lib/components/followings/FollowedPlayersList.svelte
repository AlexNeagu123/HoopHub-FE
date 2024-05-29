<script lang="ts">
	import type { Player } from '$lib/models/nba_data/players/Player';
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';
	import FollowedPlayerPreview from './FollowedPlayerPreview.svelte';

	export let playerFollows: PlayerFollowEntry[];
	export let activePlayers: Player[];

	function getPlayerById(id: string): Player {
		return activePlayers.find((player) => player.id === id) ?? activePlayers[0];
	}
</script>

<div class="flex justify-center flex-col items-center">
	{#each playerFollows as playerFollow}
		<div class="w-full flex justify-center my-5">
			<FollowedPlayerPreview player={getPlayerById(playerFollow.playerId)} />
		</div>
	{/each}
</div>
