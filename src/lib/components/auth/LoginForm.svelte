<script lang="ts">
	import Validation from '$lib/components/auth/Validation.svelte';
	import { goto } from '$app/navigation';
	import LoginModel from '$lib/models/user_access/LoginModel';
	import login from '$lib/services/user_access/login';
	import { storeToken, storeUserDetails } from '$lib/utils/auth-utils';
	import { AppRoute } from '$lib/constants';

	let logModel = new LoginModel();
	let validationErrors: { [key: string]: string } = {};

	async function updateAuthStoreAndRedirect(token: string) {
		storeToken(token);
		storeUserDetails(token);
		await goto(AppRoute.TEAMS);
	}

	async function handleLogin(e: Event) {
		e.preventDefault();
		let response = await login(logModel);
		if (!response.success) {
			validationErrors = response.validationErrors;
		} else {
			await updateAuthStoreAndRedirect(response.data);
		}
	}

	function resetValidation() {
		validationErrors = {};
	}
</script>

<div class="w-screen h-screen flex items-center justify-center">
	<form class="p-8 rounded-xl shadow-lg w-96" on:submit={handleLogin}>
		<h2 class="h2 text-2xl text-center font-semibold mb-4">Login</h2>

		<Validation {validationErrors} errorKey="Credentials" />
		<label class="label mb-3">
			<span class="text-gray-500">Username</span>
			<input
				bind:value={logModel.userName}
				on:keypress={resetValidation}
				class="variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
				type="text"
				id="username"
				name="username"
			/>
			<Validation {validationErrors} errorKey="UserName" />
		</label>

		<label class="label mb-3">
			<span class="text-gray-500">Password</span>
			<input
				bind:value={logModel.password}
				on:keypress={resetValidation}
				class="variant-filled-surface w-full border border-primary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
				type="password"
				id="password"
				name="password"
			/>
			<Validation {validationErrors} errorKey="Password" />
		</label>

		<button type="submit" class="btn border border-primary-300 mt-3 bg-primary-300 shadow w-full"
			>Login</button
		>
		<p class="mt-4 text-gray-600">
			Don't have an account? Register
			<a
				href={AppRoute.REGISTER}
				class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold"
				>here</a
			>
		</p>
	</form>
</div>
