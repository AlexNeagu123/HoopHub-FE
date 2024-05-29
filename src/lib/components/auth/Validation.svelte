<script lang="ts">
    export let validationErrors: { [key: string]: string } = {};
    export let errorKey: string;
</script>

{#if errorKey in validationErrors}
    <p class="text-red-500 text-center my-2">{validationErrors[errorKey]}</p>
{/if}