<script lang="ts">
    import NProgress from 'nprogress';
    import 'nprogress/nprogress.css';

    export let startLoading = false;

    $: if (startLoading) {
        NProgress.start();
    } else {
        NProgress.done();
    }
</script>
