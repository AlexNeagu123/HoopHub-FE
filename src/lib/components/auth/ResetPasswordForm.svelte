<script lang="ts">
	import Validation from '$lib/components/auth/Validation.svelte';
	import { AppRoute } from '$lib/constants';
	import { goto } from '$app/navigation';
	import resetPassword from '$lib/services/user_access/reset-password';
	import ResetPasswordModel from '$lib/models/user_access/ResetPasswordModel';

	const url = new URL(window.location.href);
	let resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

	resetPasswordModel.token = decodeURIComponent(url.searchParams.get('token')!);
	resetPasswordModel.email = decodeURIComponent(url.searchParams.get('email')!);

	let validationErrors: { [key: string]: string } = {};

	async function handleResetPassword(e: Event) {
		e.preventDefault();
		let response = await resetPassword(resetPasswordModel);
		if (!response.success) {
			validationErrors = response.validationErrors;
		} else {
			goto(AppRoute.LOGIN);
		}
	}

	function resetValidation() {
		validationErrors = {};
	}
</script>

<div class="w-screen h-screen flex items-center justify-center">
	<form class="p-8 rounded-xl shadow-lg w-96" on:submit={handleResetPassword}>
		<h2 class="h2 text-2xl text-center font-semibold mb-4">Reset Password</h2>

		<Validation {validationErrors} errorKey="Credentials" />
		<label class="label mb-3">
			<span class="text-gray-500">Password</span>
			<input
				bind:value={resetPasswordModel.password}
				on:keypress={resetValidation}
				class="variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
				type="password"
				id="password"
				name="password"
			/>
			<Validation {validationErrors} errorKey="Password" />
		</label>

		<label class="label mb-3">
			<span class="text-gray-500">Confirm Password</span>
			<input
				bind:value={resetPasswordModel.confirmPassword}
				on:keypress={resetValidation}
				class="variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
				type="password"
				id="confirm-password"
				name="confirm-password"
			/>
			<Validation {validationErrors} errorKey="ConfirmPassword" />
		</label>

		<button type="submit" class="btn border border-primary-300 mt-3 bg-primary-300 shadow w-full"
			>Submit</button
		>
	</form>
</div>
