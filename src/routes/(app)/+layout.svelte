<script lang="ts">
	import '../../app.pcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/shared/NavBar.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import type NotificationModel from '$lib/models/user_features/notifications/NotificationModel';
	import LeftBar from '$lib/components/shared/LeftBar.svelte';
	import { onMount } from 'svelte';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
	let hamburgerOpen: boolean = false;
	const fanInfo = data.fanInfo;
	const unreadNotificationsCount: number = data.unreadNotificationsCount;
	const unreadNotifications: NotificationModel[] = data.unreadNotifications;
	const allNotifications: NotificationModel[] = data.allNotifications;

	onMount(() => {
		console.log("WAWA");
		hamburgerOpen = false;
	});
</script>

<Toast />
<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<NavBar
			bind:hamburgerOpen
			{fanInfo}
			{unreadNotificationsCount}
			{unreadNotifications}
			{allNotifications}
		/>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<LeftBar bind:hamburgerOpen />
	</svelte:fragment>
	<slot />
</AppShell>

<style>
	:global(.dark) {
		--sdt-bg-main: #f6f6f6; /** wrap background color */
		--sdt-shadow-color: #f6f6f6; /** wrap shadow color */
		--sdt-wrap-shadow: 0 1px 6px var(--sdt-shadow-color); /** wrap shadow settings */
		--sdt-radius: 4px; /** wrap radius */
		--sdt-color: #000; /** data to select(e.g date/time) text color (except header & buttons) */
		--sdt-color-selected: #fff; /** selected data(e.g date/time) text color */
		--sdt-header-color: #000; /** header items color (e.g. text & buttons) */
		--sdt-header-btn-bg-hover: #dfdfdf; /** header items hover background color */
		--sdt-bg-selected: #c1c4bc; /** selected data(e.g date/time) background color */

		/* action buttons */
		--sdt-today-bg: #1e486d; /** date picker today button hover background color */
		--sdt-today-color: var(--sdt-bg-main); /** date picker today button text & border color */
		--sdt-clear-color: #dc3545; /** clear button text & border color */
		--sdt-clear-bg: transparent; /** clear button background color */
		--sdt-clear-hover-color: var(--sdt-bg-main); /** clear button hover text color */
		--sdt-clear-hover-bg: #dc3545; /** clear button hover background color */

		/* time picker */
		--sdt-clock-selected-bg: var(--sdt-bg-selected); /** selected time background color */
		--sdt-clock-bg: #eeeded; /** time picker inner circle background color */
		--sdt-clock-color: var(--sdt-color); /** time picker text color (watch "--sdt-color") */
		--sdt-clock-color-hover: var(
			--sdt-color
		); /** time picker hover text color (watch "--sdt-color") */
		--sdt-clock-time-bg: transparent; /** time picker time background color */
		--sdt-clock-time-bg-hover: transparent; /** time picker time selection hover background color */
		--sdt-clock-disabled-time: #b22222; /** disabled time picker time text color */
		--sdt-clock-disabled-time-bg: #eee; /** disabled time picker time background color */

		/* date picker */
		--sdt-table-selected-bg: var(--sdt-bg-selected); /** selected date background color */
		--sdt-table-disabled-date: #b22222; /** disabled dates text color */
		--sdt-table-disabled-date-bg: #eee; /** disabled dates background color */
		--sdt-table-bg: transparent; /** date picker inner table background color */
		--sdt-table-data-bg-hover: #eee; /** table selection data hover background color */
		--sdt-table-today-indicator: #ccc; /** date picker current day marker color */
	}

	:global(body) {
		scrollbar-color: #c1c4bc #dadada;
	}
</style>
