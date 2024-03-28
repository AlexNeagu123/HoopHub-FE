<script lang="ts">
    export let title: string;
    export let content: number | string;
    export let isLast: boolean;
</script>

<div class:border-r-secondary-600={isLast} class:border-r-2={isLast}
     class="flex flex-col text-center justify-center w-full hover:bg-secondary-400 cursor-default
     border-l-2 border-l-secondary-600
     border-b-2 border-b-secondary-600 border-t-2 border-t-secondary-600 shadow">
    <dt class="text-gray-500">{title}</dt>
    <dd class="font-semibold">{content}</dd>
</div>