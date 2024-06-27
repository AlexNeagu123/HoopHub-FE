<script lang="ts">
	import type FanInfo from '$lib/models/user_features/fans/FanInfo';
	import NotificationModel from '$lib/models/user_features/notifications/NotificationModel';
	import { currentUser } from '$lib/stores/auth.store';
	import { type PopupSettings } from '@skeletonlabs/skeleton';
	import InboxComponent from './InboxComponent.svelte';
	import { AppRoute } from '$lib/constants';
	import UserComponent from './UserComponent.svelte';
	export let fanInfo: FanInfo;
	export let unreadNotificationsCount: number;
	export let unreadNotifications: NotificationModel[];
	export let allNotifications: NotificationModel[];

	const fanPopUp: PopupSettings = {
		event: 'click',
		target: 'fanPopUp',
		placement: 'bottom'
	};

	let isUserOpen = false;
	let isNotificationOpen = false;
</script>

{#if $currentUser.isLoggedIn}
	<InboxComponent
		bind:isNotificationOpen
        bind:isUserOpen
		{unreadNotifications}
		{unreadNotificationsCount}
		{allNotifications}
	/>
	<UserComponent 
        bind:isUserOpen 
        bind:isNotificationOpen 
        {fanInfo} />
{:else}
	<a type="button" class="btn bg-surface-400 text-xl" href={AppRoute.LOGIN}>Login</a>
{/if}
