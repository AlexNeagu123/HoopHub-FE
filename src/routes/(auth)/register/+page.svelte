<script lang="ts">
    import {RegistrationModel} from "$lib/models/user_access/RegistrationModel";
    let regModel = new RegistrationModel();

    function handleRegister(e) {
        e.preventDefault();
        console.log(regModel);
    }
</script>

<div class="w-screen h-screen flex items-center justify-center">
    <form class="p-8 rounded-xl shadow-lg w-96" on:submit={handleRegister}>
        <h2 class="h2 text-2xl text-center font-semibold mb-4">
            Create your account
        </h2>

        <label class="label mb-3">
            <span class="text-gray-500">Email</span>
            <input bind:value={regModel.email} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700"
                   type="text" id="email" name="email"/>
        </label>

        <label class="label mb-3">
            <span class="text-gray-500">Username</span>
            <input bind:value={regModel.userName} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700"
                   type="text" id="username" name="username"/>
        </label>

        <label class="label mb-3">
            <span class="text-gray-500">Password</span>
            <input bind:value={regModel.password} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700"
                   type="password" id="password" name="password"/>
        </label>

        <label class="label mb-3">
            <span class="text-gray-500">Confirm Password</span>
            <input bind:value={regModel.confirmPassword} class="w-full border border-secondary-600 px-3 py-2 rounded-full shadow
            focus:outline-0 focus:border-secondary-700 focus:ring-1 focus:ring-secondary-700"
                   type="password" id="confirm-password" name="confirm-password"/>
        </label>

        <button type="submit" class="btn border border-secondary-300 mt-3 bg-secondary-300 shadow w-full">Create</button>
    </form>
</div>