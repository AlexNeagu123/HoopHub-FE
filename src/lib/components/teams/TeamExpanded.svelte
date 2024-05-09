<script lang="ts">
	import type { Team } from '$lib/models/nba_data/teams/Team';
	import AboutCard from '$lib/components/shared/AboutCard.svelte';
	import StatCard from '$lib/components/shared/StatCard.svelte';
	import TeamHeader from '$lib/components/teams/TeamHeader.svelte';
	import { Modal, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { AppRoute, TeamPageTypes, ToastMessages } from '$lib/constants';
	import { page } from '$app/stores';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalForm from '$lib/components/threads/TeamThreadModalForm.svelte';
	import { currentUser } from '$lib/stores/auth.store';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import addTeamThread from '$lib/services/user_features/threads/addTeamThread';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const modalRegistry: Record<string, ModalComponent> = {
		formModal: { ref: ModalForm }
	};

	let id = $page.params.id;

	const modal: ModalSettings = {
		type: 'component',
		component: 'formModal',
		title: 'Create a new thread',
		body: 'Fill up the fields and create a new thread..',
		meta: {
			operationId: id,
			submitFormHandler: addTeamThread
		}
	};

	export let team: Team;
	export let pageType: string;

	function triggerCreateThreadModal() {
		modalStore.trigger(modal);
	}

	function checkLoggedIn(event: Event) {
		if (!$currentUser.isLoggedIn) {
			event.preventDefault();
			toastStore.trigger({
				message: ToastMessages.actionRequiresLogIn,
				background: 'variant-filled-error'
			});
		}
	}
</script>

<div class="flex justify-center">
	<div class="card variant-filled-surface m-10 w-3/4 p-5 px-10 drop-shadow">
		<div class="flex items-center">
			<TeamHeader {team} />

			<div class="flex ml-auto text-center">
				<StatCard title="SRS" border={true} content={team.teamBio[0].srs} />
				<StatCard title="ORTG" border={true} content={team.teamBio[0].oRtg} />
				<StatCard title="DRTG" border={true} content={team.teamBio[0].dRtg} />
				<StatCard title="PACE" border={true} content={team.teamBio[0].pace} />
				<StatCard title="W-L %" border={false} content={team.teamBio[0].winLossRatio} />
			</div>
		</div>

		<dl class="list-dl text-center mt-5">
			<div>
				<AboutCard title="Abbreviation" content={team.abbreviation} />
				<AboutCard title="City" content={team.city} />
				<AboutCard title="Conference" content={team.conference} />
				<AboutCard title="Division" content={team.division} />
			</div>
		</dl>

		<div class="mt-5 flex justify-between">
			<TabGroup
				border="none"
				justify="justify-start"
				active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
				hover="hover:bg-secondary-500"
			>
				<TabAnchor href="{AppRoute.TEAM}/{id}" selected={pageType === TeamPageTypes.ROSTER}
					>Roster</TabAnchor
				>
				<TabAnchor href="{AppRoute.TEAM}/{id}/bio" selected={pageType === TeamPageTypes.BIO}
					>History</TabAnchor
				>
				<TabAnchor href="{AppRoute.TEAM}/{id}/latest" selected={pageType === TeamPageTypes.LATEST}
					>Latest
				</TabAnchor>
				<TabAnchor
					on:click={checkLoggedIn}
					href="{AppRoute.TEAM}/{id}/threads"
					selected={pageType === TeamPageTypes.THREADS}
					>Threads
				</TabAnchor>
			</TabGroup>
			{#if pageType === TeamPageTypes.THREADS}
				<button
					type="button"
					class="btn variant-filled-surface hover:variant-filled-primary"
					on:click={triggerCreateThreadModal}
				>
					<span><i class="fa-solid fa-plus"></i></span>
					<span>Create thread</span>
				</button>
			{/if}
		</div>
		<slot />
	</div>
</div>

<Modal components={modalRegistry} />
