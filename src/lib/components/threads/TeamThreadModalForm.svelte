<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalInput from '$lib/components/threads/ModalInput.svelte';
	import ModalTextArea from '$lib/components/threads/ModalTextArea.svelte';
	import addTeamThread from '$lib/services/user_features/threads/addTeamThread';
	import Validation from '../auth/Validation.svelte';

	// dictionary please
	let validationErrors: { [key: string]: string } = {};
	const modalStore = getModalStore();

	const formData = {
		title: '',
		content: ''
	};

	const teamId: string = $modalStore[0].meta.teamId ?? '';

	async function onFormSubmit() {
		console.log(formData);
		const response = await addTeamThread(teamId, formData.title, formData.content);
		if (response.success === false) {
			validationErrors = response.validationErrors;
		} else {
			modalStore.close();
			window.location.reload();
		}
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4 variant-filled-surface';
	const cHeader = 'text-2xl font-bold';
	const cForm =
		'border border-surface-500 p-4 space-y-4 rounded-container-token variant-filled-surface';

	function onClose() {
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<div class="flex justify-between">
			<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
			<button class="btn variant-filled-surface focus:border-none !outline-none" on:click={onClose}>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<form class="modal-form {cForm}">
			<ModalInput labelTitle="Thread Title" bind:textData={formData.title} />
			<Validation {validationErrors} errorKey="Title" />
			<ModalTextArea labelTitle="Thread Content" bind:textData={formData.content} />
			<Validation {validationErrors} errorKey="Content" />
		</form>
		<footer class="modal-footer flex justify-center">
			<button class="btn variant-filled-surface drop-shadow" on:click={onFormSubmit}
				>Submit Form</button
			>
		</footer>
	</div>
{/if}
