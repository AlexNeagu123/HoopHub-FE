<script lang="ts">
	import ResetPasswordForm from "$lib/components/auth/ResetPasswordForm.svelte";
	import { onMount } from "svelte";
    import { removeToken } from '$lib/utils/auth-utils';

    function initAuthStore() {
        removeToken();
    }

    onMount(() => {
        initAuthStore();
    })    
</script>

<ResetPasswordForm />