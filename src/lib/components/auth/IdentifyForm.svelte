<script lang="ts">
	import { AppRoute } from '$lib/constants';
	import resetPasswordIdentify from '$lib/services/user_access/reset-password-identify';
	import Validation from './Validation.svelte';

	let email: string = '';
	let validationErrors: { [key: string]: string } = {};
	let emailSubmitted = false;

	function resetValidation() {
		validationErrors = {};
	}

	async function handleIdentify(e: Event) {
		e.preventDefault();
        if(email === "") {
            validationErrors = {Email: "Email is required"};
            return;
        }
		var response = await resetPasswordIdentify(email);
		if (!response.success) {
			validationErrors = response.validationErrors;
		} else {
			emailSubmitted = true;
		}
	}
</script>

<div class="w-screen h-screen flex items-center justify-center">
	<form class="p-8 rounded-xl shadow-lg w-96" on:submit={handleIdentify}>
		{#if emailSubmitted}
			<p class="text-center text-success-600 py-3">
				Email sent! You should receive the instructions on how to reset your password.
			</p>
		{/if}

		<h2 class="h2 text-2xl text-center font-semibold mb-4">Reset password</h2>
		<Validation {validationErrors} errorKey="Credentials" />
		<label class="label mb-3">
			<span class="text-gray-500">Enter your email</span>
			<input
				bind:value={email}
				on:keypress={resetValidation}
				class="variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
				type="text"
				id="username"
				name="username"
			/>
			<Validation {validationErrors} errorKey="Email" />
		</label>

		<button type="submit" class="btn border border-primary-300 mt-3 bg-primary-300 shadow w-full"
			>Submit</button
		>

		<div class="flex justify-evenly">
			<p class="mt-4 text-gray-600">
				<a
					href={AppRoute.REGISTER}
					class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold"
					>Register Here</a
				>
			</p>

			<p class="mt-4 text-gray-600">
				<a
					href={AppRoute.LOGIN}
					class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold"
					>Login Here</a
				>
			</p>
		</div>
	</form>
</div>
