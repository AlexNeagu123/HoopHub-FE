<script lang="ts">
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';
	import addPlayerFollowEntry from '$lib/services/user_features/followings/addPlayerFollowEntry';
	import deletePlayerFollowEntry from '$lib/services/user_features/followings/deletePlayerFollowEntry';
	import EmptyStar from '../shared/EmptyStar.svelte';
	import FullStar from '../shared/FullStar.svelte';

	export let playerFollows: PlayerFollowEntry[] = [];
	export let playerId: string;

	let isPlayerFollowed = playerFollows.some((playerFollow) => playerFollow.playerId === playerId);

	async function followClickHandle() {
		let oldStatusFollowed = isPlayerFollowed;
		isPlayerFollowed = !isPlayerFollowed;
		if (oldStatusFollowed) {
			await deletePlayerFollowEntry(playerId);
		} else {
			await addPlayerFollowEntry(playerId);
		}
	}
</script>

<div class="flex">
	<p class="h4 font-semibold">
		Follow Player
		<button type="button" class="h3 btn-icon variant-filled-surface" on:click={followClickHandle}>
			{#if isPlayerFollowed}
				<FullStar />
			{:else}
				<EmptyStar />
			{/if}
		</button>
	</p>
</div>
