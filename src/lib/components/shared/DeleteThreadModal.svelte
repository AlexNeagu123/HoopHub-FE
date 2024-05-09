<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppRoute } from '$lib/constants';
	import deleteTeamThread from '$lib/services/user_features/threads/deleteTeamThread';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	const threadId: string = $modalStore[0].meta.id;
	const teamId: string = $modalStore[0].meta.teamId;

	async function onFormSubmit() {
		await deleteTeamThread(threadId);
		modalStore.close();
		goto(`${AppRoute.TEAM}/${teamId}`);
	}

	function onClose() {
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4 variant-filled-surface';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<div class="flex justify-between">
			<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		</div>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<footer class="modal-footer flex justify-center">
			<button class="btn variant-filled-error shadow m-2 border-none" on:click={onFormSubmit}
				>Confirm</button
			>
			<button class="btn variant-filled-primary shadow m-2 border-none" on:click={onClose}
				>Cancel</button
			>
		</footer>
	</div>
{/if}
