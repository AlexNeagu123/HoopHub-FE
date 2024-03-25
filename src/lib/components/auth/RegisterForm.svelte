<script lang="ts">
    import RegistrationModel from "$lib/models/user_access/RegistrationModel";
    import register from "$lib/services/user_access/register";
    import Validation from "$lib/components/auth/Validation.svelte";
    import {goto} from "$app/navigation";
    import {AppRoute} from "$lib/constants";

    let regModel = new RegistrationModel();
    let validationErrors: { [key: string]: string } = {};

    async function handleRegister(e: Event) {
        e.preventDefault();
        let response = await register(regModel);
        if (!response.success) {
            validationErrors = response.validationErrors;
        } else {
            await goto(AppRoute.LOGIN);
        }
    }

    function resetValidation() {
        validationErrors = {}
    }
</script>

<div class="w-screen h-screen flex items-center justify-center">
    <form class="p-8 rounded-xl shadow-lg w-96" on:submit={handleRegister}>
        <h2 class="h2 text-2xl text-center font-semibold mb-4">
            Create your account
        </h2>

        <label class="label mb-3">
            <span class="text-gray-500">Email</span>
            <input bind:value={regModel.email} on:keypress={resetValidation} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700 selection:bg-secondary-600"
                   type="text" id="email" name="Email"/>
            <Validation validationErrors={validationErrors} errorKey="Email"/>
        </label>

        <label class="label mb-3">
            <span class="text-gray-500">Username</span>
            <input bind:value={regModel.userName} on:keypress={resetValidation} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700 selection:bg-secondary-600"
                   type="text" id="username" name="username"/>
            <Validation validationErrors={validationErrors} errorKey="UserName"/>
        </label>

        <label class="label mb-3">
            <span class="text-gray-500">Password</span>
            <input bind:value={regModel.password} on:keypress={resetValidation} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700 selection:bg-secondary-600"
                   type="password" id="password" name="password"/>
            <Validation validationErrors={validationErrors} errorKey="Password"/>
        </label>

        <label class="label mb-3">
            <span class="text-gray-500">Confirm Password</span>
            <input bind:value={regModel.confirmPassword} on:keypress={resetValidation} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700 selection:bg-secondary-600"
                   type="password" id="confirm-password" name="confirm-password"/>
            <Validation validationErrors={validationErrors} errorKey="ConfirmPassword"/>
        </label>

        <button type="submit" class="btn border border-secondary-300 mt-3 bg-secondary-300 shadow w-full">Create
        </button>
        <p class="mt-4 text-gray-600">Already have an account? Click
            <a href="{AppRoute.LOGIN}"
               class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold">here</a>
            to login</p>
    </form>
</div>
