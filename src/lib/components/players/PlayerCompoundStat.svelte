<script lang="ts">
    export let titles: string[];
    export let contents: any[];
    export let isLast: boolean;
</script>

<div class:border-r-secondary-600={isLast} class:border-r-2={isLast}
     class="flex flex-col cursor-default border-l-2 border-l-secondary-600
     border-t-2 border-t-secondary-600 border-b-2 border-b-secondary-600 shadow w-full">
    <div class="hover:bg-secondary-400 h-1/2 py-2 border-b-2 border-b-secondary-600 text-center">
        <dt class="text-gray-500">{titles[0]}</dt>
        <dd class="font-semibold">{contents[0]}</dd>
    </div>
    <div class="hover:bg-secondary-400 h-1/2 py-2 text-center">
        <dt class="text-gray-500">{titles[1]}</dt>
        <dd class="font-semibold">{contents[1]}</dd>
    </div>
</div>