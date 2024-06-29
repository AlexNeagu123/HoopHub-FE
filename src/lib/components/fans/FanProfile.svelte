<script lang="ts">
	import { AppRoute, ProfilePageTypes } from '$lib/constants.js';
	import FanRank from '$lib/components/fans/FanRank.svelte';
	import FanStatsContainer from '$lib/components/fans/FanStatsContainer.svelte';
	import { Avatar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import TeamSupportedContainer from '$lib/components/fans/TeamSupportedContainer.svelte';
	import updateFanInfo from '$lib/services/user_features/fans/updateFanInfo';
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import type ProfilePageInfo from '$lib/models/user_features/fans/ProfilePageInfo';
	import InformativePopUps from '../shared/InformativePopUps.svelte';

	export let ownInfo: FanInfo;
	export let profilePageInfo: ProfilePageInfo;
	export let profilePageType: ProfilePageTypes;

	const isOwnProfile = ownInfo.id === profilePageInfo.fanInfo.id;
	let avatarUrl: string = profilePageInfo.fanInfo.avatarPhotoUrl;

	let fileInput: HTMLElement;
	let files: FileList;

	let uploadedImage: File | null = null;
	let changesMade: boolean = false;

	function triggerFileInput() {
		if (fileInput) {
			fileInput.click();
		}
	}

	function handleFileSelect() {
		if (files.length > 0) {
			uploadedImage = files[0];
			avatarUrl = URL.createObjectURL(uploadedImage);
			changesMade = true;
		}
	}

	async function changesSubmited() {
		await updateFanInfo(uploadedImage, profilePageInfo.favouriteTeam);
		window.location.reload();
	}
</script>

<InformativePopUps />

<div class="flex justify-center">
	<div class="card md:m-10 w-full md:w-1/2 px-5 md:px-10 py-3 drop-shadow variant-filled-surface">
		<div class="flex justify-between">
			<div class="flex flex-col w-1/2">
				<div class="w-full">
					<FanRank
						badge={profilePageInfo.fanInfo.fanBadge}
						username={profilePageInfo.fanInfo.username}
						bind:favouriteTeam={profilePageInfo.favouriteTeam}
						{isOwnProfile}
						bind:changesMade
						availableTeams={profilePageInfo.availableTeams}
					/>
				</div>
				<TeamSupportedContainer team={profilePageInfo.favouriteTeam} />
			</div>
			<button
				class="{isOwnProfile ? 'hover:bg-surface-100 hover:opacity-40' : 'cursor-default'}
        w-[20%] rounded-full bg-surface-500 flex justify-center"
				on:click={() => {
					if (isOwnProfile) triggerFileInput();
				}}
			>
				<Avatar
					width="w-[90%]"
					rounded="rounded-full"
					background="bg-transparent"
					src={avatarUrl}
				/>
			</button>

			{#if isOwnProfile}
				<input
					type="file"
					bind:this={fileInput}
					bind:files
					accept="image/png"
					class="hidden"
					on:change={handleFileSelect}
				/>
			{/if}
		</div>
		<div class="md:w-1/2">
			<FanStatsContainer
				upvotes={profilePageInfo.fanInfo.upVotes}
				downvotes={profilePageInfo.fanInfo.downVotes}
				comments={profilePageInfo.fanInfo.commentsCount}
				reviews={profilePageInfo.fanInfo.reviewsCount}
			/>
		</div>
		<div class="w-full flex justify-between">
			<div class="mt-4 mb-2 flex {isOwnProfile ? 'flex-col' : 'flex-row'} md:flex-row">
				<div class="{isOwnProfile ? 'mt-2' : 'mt-0'} md:mt-0">
					<TabGroup
						border="none"
						justify="justify-start"
						active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
						hover="hover:bg-secondary-500"
					>
						<TabAnchor
							href="{AppRoute.PROFILE}/{profilePageInfo.fanInfo.id}"
							selected={profilePageType === ProfilePageTypes.THREADS}>Threads</TabAnchor
						>
						<TabAnchor
							href="{AppRoute.PROFILE}/{profilePageInfo.fanInfo.id}/comments"
							selected={profilePageType === ProfilePageTypes.COMMENTS}>Comments</TabAnchor
						>
					</TabGroup>
				</div>
				<div class="{isOwnProfile ? 'mt-2' : 'mt-0'} md:mt-0">
					<TabGroup
						border="none"
						justify="justify-start"
						active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
						hover="hover:bg-secondary-500"
					>
						<TabAnchor
							href="{AppRoute.PROFILE}/{profilePageInfo.fanInfo.id}/reviews"
							selected={profilePageType === ProfilePageTypes.REVIEWS}>Reviews</TabAnchor
						>
						<TabAnchor
							href="{AppRoute.PROFILE}/{profilePageInfo.fanInfo.id}/following"
							selected={profilePageType === ProfilePageTypes.FOLLOWING}>Following</TabAnchor
						>
					</TabGroup>
				</div>
			</div>
			{#if isOwnProfile}
				<div class="mt-4 mb-2 flex flex-col justify-center w-1/3 md:w-1/5">
					<button
						type="button"
						class="btn variant-ghost-primary font-semibold {!changesMade
							? 'text-gray-400 ' + 'cursor-not-allowed'
							: 'text-gray-600'}"
						on:click={async () => {
							if (!changesMade) return;
							await changesSubmited();
						}}
					>
						Save changes
					</button>
				</div>
			{/if}
		</div>
		<slot />
	</div>
</div>
