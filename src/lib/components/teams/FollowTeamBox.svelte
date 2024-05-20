<script lang="ts">
	import type { TeamFollowEntry } from '$lib/models/user_features/followings/TeamFollowEntry';
	import addTeamFollowEntry from '$lib/services/user_features/followings/addTeamFollowEntry';
	import deleteTeamFollowEntry from '$lib/services/user_features/followings/deleteTeamFollowEntry';
	import EmptyStar from '../shared/EmptyStar.svelte';
	import FullStar from '../shared/FullStar.svelte';

	export let teamFollows: TeamFollowEntry[] = [];
	export let teamId: string;

	let isTeamFollowed = teamFollows.some((teamFollow) => teamFollow.teamId === teamId);

	async function followClickHandle() {
		let oldStatusFollowed = isTeamFollowed;
		isTeamFollowed = !isTeamFollowed;
		if (oldStatusFollowed) {
			await deleteTeamFollowEntry(teamId);
		} else {
			await addTeamFollowEntry(teamId);
		}
	}
</script>

<div class="flex">
	<p class="h4 font-semibold">
		Follow Team
		<button type="button" class="h3 btn-icon variant-filled-surface" on:click={followClickHandle}>
			{#if isTeamFollowed}
				<FullStar />
			{:else}
				<EmptyStar />
			{/if}
		</button>
	</p>
</div>
