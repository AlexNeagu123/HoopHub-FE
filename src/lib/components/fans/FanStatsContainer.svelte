<script lang="ts">
    import Upvote from "$lib/components/icons/Upvote.svelte";
    import Downvote from "$lib/components/icons/Downvote.svelte";
    import IComment from "$lib/components/icons/IComment.svelte";
    import Review from "$lib/components/icons/Review.svelte";

    export let upvotes: number = 0;
    export let downvotes: number = 0;
    export let comments: number = 0;

    export let reviews: number = 0;
</script>

<div class="flex justify-between w-full my-2">
    <div class="flex">
        <Upvote height={30} width={30}/>
        <h4 class="h4 px-1 font-semibold text-gray-600">{upvotes}</h4>
    </div>
    <div class="flex">
        <Downvote height={30} width={30}/>
        <h4 class="h4 px-1 font-semibold text-gray-600">{downvotes}</h4>
    </div>
    <div class="flex">
        <IComment height={30} width={30}/>
        <h4 class="h4 px-2 font-semibold text-gray-600">{comments}</h4>
    </div>

    <div class="flex">
        <Review height={30} width={30}/>
        <h4 class="h4 px-2 font-semibold text-gray-600">{reviews}</h4>
    </div>
</div>