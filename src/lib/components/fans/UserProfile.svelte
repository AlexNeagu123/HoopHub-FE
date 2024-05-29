<script lang="ts">
	import type ProfilePageInfo from '$lib/models/user_features/fans/ProfilePageInfo';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { AppRoute, rankColors, rankTexts } from '$lib/constants';

	export let ownInfo: ProfilePageInfo;
	let avatarUrl: string = ownInfo.fanInfo.avatarPhotoUrl;

	function handleEditProfile() {
		window.location.href = `${AppRoute.PROFILE}/${ownInfo.fanInfo.id}`;
	}
</script>

<div class="flex justify-center">
	<div class="card m-10 w-1/3 px-10 py-3 drop-shadow variant-filled-surface">
		<div class="w-full flex justify-between py-5">
			<div class="flex flex-col">
				<h3 class="h3 font-semibold {rankColors[ownInfo.fanInfo.fanBadge]}">
					{rankTexts[ownInfo.fanInfo.fanBadge]}
					<div class="h1 font-bold {rankColors[ownInfo.fanInfo.fanBadge]}">
						{ownInfo.fanInfo.username}
					</div>
				</h3>
				<div class="my-3">
					<button class="btn variant-filled-secondary" on:click={handleEditProfile}>
						Edit Fan Profile
					</button>
				</div>
			</div>
			<Avatar width="w-1/4" rounded="rounded-full" background="bg-transparent" src={avatarUrl} />
		</div>
		<slot />
	</div>
</div>
