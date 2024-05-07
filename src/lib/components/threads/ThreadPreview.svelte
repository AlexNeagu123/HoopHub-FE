<script lang="ts">
    import {Avatar, RadioGroup} from "@skeletonlabs/skeleton";
    import IComment from "$lib/components/icons/IComment.svelte";
    import VotingContainer from "$lib/components/threads/VotingContainer.svelte";

    export let title: string;
    export let author: string;
    export let time: string;
    export let content: string;
    export let upvotes: number = 120;
    export let downvotes: number = 120;
    export let comments: number = 120;
</script>

<div class="w-[48%] card card-hover variant-filled-surface shadow p-5 my-2 cursor-pointer">
    <div class="flex flex-col">
        <div class="flex flex-start justify-between py-3">
            <div class="flex flex-start">
                <Avatar src="https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
                        width="w-5" background="bg-transparent"/>
                <h6 class="h6 px-2 font-semibold">
                    @{author}
                </h6>
            </div>
            <div>
                <p class="text-gray-600 font-light">
                    {time}
                </p>
            </div>
        </div>
        <h3 class="h3">
            {title}
        </h3>
        <div class="container py-3 px-1">
            <p>
                {content}
            </p>
        </div>
        <div class="flex justify-between">
            <RadioGroup background="bg-surface" active="variant-filled-primary">
                <div class="flex">
                    <VotingContainer upvotes={upvotes} downvotes={downvotes}/>
                </div>
            </RadioGroup>
            <div class="flex variant-filled-secondary hover:variant-filled-tertiary
                        items-center rounded-full w-1/4 justify-center m-1">
                <IComment height={14} width={14}/>
                <p class="px-1">
                    {comments}
                </p>
            </div>
        </div>
    </div>
</div>