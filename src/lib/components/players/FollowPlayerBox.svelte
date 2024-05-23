<script lang="ts">
	import type { PlayerFollowEntry } from '$lib/models/user_features/followings/PlayerFollowEntry';
	import addPlayerFollowEntry from '$lib/services/user_features/followings/addPlayerFollowEntry';
	import deletePlayerFollowEntry from '$lib/services/user_features/followings/deletePlayerFollowEntry';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import EmptyStar from '../shared/EmptyStar.svelte';
	import FullStar from '../shared/FullStar.svelte';
	import { FollowMessage, UnfollowedMessage } from '$lib/constants';

	export let playerFollows: PlayerFollowEntry[] = [];
	export let playerId: string;
	export let playerName: string;

	const toastStore = getToastStore();
	let isPlayerFollowed = playerFollows.some((playerFollow) => playerFollow.playerId === playerId);

	async function followClickHandle() {
		let oldStatusFollowed = isPlayerFollowed;
		isPlayerFollowed = !isPlayerFollowed;
		if (oldStatusFollowed) {
			await deletePlayerFollowEntry(playerId);
			toastStore.trigger({
				message: UnfollowedMessage(playerName),
				background: 'variant-filled-warning'
			});
		} else {
			await addPlayerFollowEntry(playerId);
			toastStore.trigger({
				message: FollowMessage(playerName),
				background: 'variant-filled-success'
			});
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
