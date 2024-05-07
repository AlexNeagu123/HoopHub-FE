<script lang="ts">
    import {RadioItem} from "@skeletonlabs/skeleton";
    import Upvote from "$lib/components/icons/Upvote.svelte";
    import Downvote from "$lib/components/icons/Downvote.svelte";

    let value: number = -1;
    export let upvotes: number;
    export let downvotes: number;
</script>

<RadioItem bind:group={value} name="justify" hover="hover:variant-filled-primary"
           value={0}>
    <div class="flex justify-center items-center">
        <Upvote height={14} width={14} isClicked={value === 0}/>
        <p class="px-1">
            {upvotes}
        </p>
    </div>
</RadioItem>
<RadioItem bind:group={value} name="justify" hover="hover:variant-filled-primary"
           value={1}>
    <div class="flex justify-center items-center">
        <Downvote height={14} width={14} isClicked={value === 1}/>
        <p class="px-1">
            {downvotes}
        </p>
    </div>
</RadioItem>