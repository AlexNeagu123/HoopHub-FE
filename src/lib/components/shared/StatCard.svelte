<script lang="ts">
    export let title: string;
    export let content: string;
    export let border: boolean;
</script>

<span class:border-r-2={border} class:border-secondary-600={border} class="p-5">
    <dt class="text-gray-500">{title}</dt>
    <dd class="font-semibold">{content}</dd>
</span>
