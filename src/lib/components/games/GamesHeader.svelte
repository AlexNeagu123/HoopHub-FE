<script lang="ts">
    import Calendar from "$lib/components/icons/Calendar.svelte";
    import {SlideToggle} from "@skeletonlabs/skeleton";
    import SveltyPicker from "svelty-picker";
    import Card from "$lib/components/shared/Card.svelte";

    export let dateChangeHandler: (e: CustomEvent) => void;
    export let hideScoresHandler: () => void;
</script>

<Card>
    <div class="flex items-center align-middle gap-1">
        <Calendar/>
        <SveltyPicker todayBtn={false} clearBtn={false} on:change={dateChangeHandler} initialDate={new Date()}
                      inputClasses="relative z-100 cursor-pointer border-none h-full variant-filled-surface drop-shadow rounded"/>
    </div>
    <div class="flex justify-end items-center text-lg">
        <SlideToggle active="bg-secondary-700" background="bg-surface-700" name="slider-label" on:click={hideScoresHandler}>
            Hide Scores
        </SlideToggle>
    </div>
</Card>