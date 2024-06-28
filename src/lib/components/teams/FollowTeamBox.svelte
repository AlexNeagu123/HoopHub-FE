<script lang="ts">
	import { FollowMessage, ToastMessages, UnfollowedMessage } from '$lib/constants';
	import type { TeamFollowEntry } from '$lib/models/user_features/followings/TeamFollowEntry';
	import addTeamFollowEntry from '$lib/services/user_features/followings/addTeamFollowEntry';
	import deleteTeamFollowEntry from '$lib/services/user_features/followings/deleteTeamFollowEntry';
	import { currentUser } from '$lib/stores/auth.store';
	import EmptyStar from '../shared/EmptyStar.svelte';
	import FullStar from '../shared/FullStar.svelte';

	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	export let teamFollows: TeamFollowEntry[] = [];
	export let teamId: string;
	export let teamName: string;

	let isTeamFollowed = teamFollows.some((teamFollow) => teamFollow.teamId === teamId);

	async function followClickHandle() {
		if (!$currentUser.isLoggedIn) {
			toastStore.trigger({
				message: ToastMessages.actionRequiresLogIn,
				background: 'variant-filled-error'
			});
			return;
		}

		let oldStatusFollowed = isTeamFollowed;
		isTeamFollowed = !isTeamFollowed;
		if (oldStatusFollowed) {
			await deleteTeamFollowEntry(teamId);
			toastStore.trigger({
				message: UnfollowedMessage(teamName),
				background: 'variant-filled-warning'
			});
		} else {
			await addTeamFollowEntry(teamId);
			toastStore.trigger({
				message: FollowMessage(teamName),
				background: 'variant-filled-success'
			});
		}
	}
</script>

<div class="flex">
	<p class="h3 md:h4 font-semibold {!$currentUser.isLoggedIn ? 'text-gray-500' : ''}">
		Follow Team
		<button type="button" class="h2 md:h3 btn-icon variant-filled-surface" on:click={followClickHandle}>
			{#if isTeamFollowed}
				<FullStar />
			{:else}
				<EmptyStar />
			{/if}
		</button>
	</p>
</div>
