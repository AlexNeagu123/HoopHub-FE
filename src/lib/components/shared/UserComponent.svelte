<script lang="ts">
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import UserIconLink from '../fans/UserIconLink.svelte';
	import Profile from '../icons/Profile.svelte';
	import { AppRoute } from '$lib/constants';
	import Settings from '../icons/Settings.svelte';
	import LogOut from '../icons/LogOut.svelte';

	export let fanInfo: FanInfo;

	export let isNotificationOpen = false;
	export let isUserOpen = false;
</script>

<button
	class="w-14 h-14 rounded-full bg-surface-400 flex items-center justify-center cursor-pointer avatar"
	on:click={() => {
		isUserOpen = !isUserOpen;
		if (isUserOpen) isNotificationOpen = false;
	}}
>
	<Avatar
		src={fanInfo.avatarPhotoUrl}
		width="w-12"
		height="h-12"
		rounded="rounded-full"
		background="bg-transparent"
	/>
</button>

{#if isUserOpen}
	<div
		class="fixed shadow-xl variant-filled-surface top-20 md:top-24 right-0 card md:variant-filled-surface p-4"
	>
		<p class="font-semibold my-2 p-2 shadow-sm">{fanInfo.username}</p>
		<UserIconLink bind:isUserOpen   link="{AppRoute.PROFILE}/{fanInfo.id}" linkText="Profile">
			<Profile />
		</UserIconLink>

		<UserIconLink bind:isUserOpen link={AppRoute.SETTINGS} linkText="Settings">
			<Settings />
		</UserIconLink>

		<UserIconLink bind:isUserOpen link={AppRoute.LOGOUT} linkText="Logout">
			<LogOut />
		</UserIconLink>
	</div>
{/if}
