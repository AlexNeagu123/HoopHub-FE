<script lang="ts">
	import type ProfilePageInfo from '$lib/models/user_features/fans/ProfilePageInfo';
	import editUserDetails from '$lib/services/user_access/edit-user-details';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import Validation from '../auth/Validation.svelte';
	import resetPasswordIdentify from '$lib/services/user_access/reset-password-identify';
	export let ownInfo: ProfilePageInfo;

	let isEditing = false;
	let newUsername = ownInfo.fanInfo.username;
	let validationErrors: { [key: string]: string } = {};
	let emailSubmitted = false;

	async function toggleEditMode() {
		if (isEditing && newUsername !== ownInfo.fanInfo.username) {
			const response = await editUserDetails(newUsername, ownInfo.fanInfo.isLicensed);
			if (!response.success) {
				validationErrors = response.validationErrors;
			} else {
				ownInfo.fanInfo.username = newUsername;
				isEditing = !isEditing;
			}
		} else {
			resetValidation();
			isEditing = !isEditing;
		}
	}

	function resetValidation() {
		validationErrors = {};
	}

	async function toggleLicensedModeHandler() {
		const response = await editUserDetails(null, !ownInfo.fanInfo.isLicensed);
		if (response.success) {
			ownInfo.fanInfo.isLicensed = !ownInfo.fanInfo.isLicensed;
		}
	}

	async function changePasswordHandler() {
		var response = await resetPasswordIdentify(null);
		if (!response.success) {
			validationErrors = response.validationErrors;
		} else {
			emailSubmitted = true;
		}
	}
</script>

<div class="flex flex-col w-full justify-center items-center shadow p-5">
	{#if emailSubmitted}
		<p class="text-center text-success-600 py-3">
			Email sent! You should receive the instructions on how to reset your password.
		</p>
	{/if}
	<div class="w-full flex justify-between my-5 items-center">
		<div class="flex flex-col justify-center">
			<span class="text-gray-600">Username</span>
			{#if isEditing}
				<Validation {validationErrors} errorKey="Username" />
				<input
					on:keypress={resetValidation}
					class="variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
				focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
					bind:value={newUsername}
				/>
			{:else}
				<span class="font-semibold">{ownInfo.fanInfo.username}</span>
			{/if}
		</div>
		<button class="btn variant-filled-primary h-1/2" on:click={toggleEditMode}>
			{#if isEditing}
				Submit
			{:else}
				Edit
			{/if}
		</button>
	</div>
	<div class="w-full flex justify-between my-5">
		<div class="flex flex-col justify-center">
			<span class="text-gray-600">Licensed Mode</span>
			<span class="font-semibold">{ownInfo.fanInfo.isLicensed ? 'Yes' : 'No'}</span>
		</div>
		<SlideToggle
			active="bg-secondary-700"
			background="bg-surface-700"
			name="slider-label"
			checked={ownInfo.fanInfo.isLicensed}
			on:click={toggleLicensedModeHandler}
		></SlideToggle>
	</div>
	<div class="w-full flex justify-between my-5">
		<Validation {validationErrors} errorKey="Email" />
		<div class="flex flex-col justify-center">
			<span class="text-gray-600">Change Password</span>
		</div>
		<button class="btn variant-filled-primary" on:click={changePasswordHandler}>Send Email</button>
	</div>
</div>
