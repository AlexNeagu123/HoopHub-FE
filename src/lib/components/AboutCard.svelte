<script lang="ts">
    export let title: string;
    export let content: string;
</script>

<div class="flex-auto card variant-filled-primary drop-shadow">
    <span class="flex-auto">
        <dt class="text-gray-600">{title}</dt>
        <dd class="font-bold text-gray-600">{content}</dd>
    </span>
</div>
