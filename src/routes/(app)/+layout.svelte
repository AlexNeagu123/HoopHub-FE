<script lang="ts">
    import '../../app.pcss';
    import {AppShell} from "@skeletonlabs/skeleton";
    import NavBar from "$lib/components/shared/NavBar.svelte";
    import {authToken} from "$lib/stores/auth.store";
    import axios from "axios";

    axios.interceptors.request.use(
        function(config) {
            if($authToken) {
                config.headers['Authorization'] = `Bearer ${$authToken}`;
            }
            return config;
        }
    );
</script>


<AppShell>
    <svelte:fragment slot="header">
        <NavBar/>
    </svelte:fragment>
    <slot/>
</AppShell>