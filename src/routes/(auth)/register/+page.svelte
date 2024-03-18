<script lang="ts">
import InputField from "$lib/components/InputField.svelte";
</script>

<div class="w-screen h-screen flex items-center justify-center">
    <form class="p-8 rounded-xl shadow-lg w-96">
        <h2 class="h2 text-2xl text-center font-semibold mb-4">
            Create your account
        </h2>
        <InputField type="text" purpose="email" label="Email"/>
        <InputField type="text" purpose="username" label="Username"/>
        <InputField type="password" purpose="password" label="Password"></InputField>
        <InputField type="password" purpose="confirm-password" label="Confirm Password"></InputField>
    </form>
</div>