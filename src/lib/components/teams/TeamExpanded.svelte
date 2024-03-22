<script lang="ts">
    import type {Team} from "$lib/models/nba_data/Team";
    import {Avatar, RadioGroup, RadioItem} from "@skeletonlabs/skeleton";
    import AboutCard from "$lib/components/shared/AboutCard.svelte";
    import PlayerPreview from "$lib/components/players/PlayerPreview.svelte";

    export let team: Team;
    let value: string = "Roster";
</script>

<div class="flex justify-center">
    <div class="card variant-filled-primary m-10 w-3/4 text-center p-4 drop-shadow">
        <header class="card-header variant-filled-primary h2">{team.fullName}</header>
        <section>
            <div class="flex justify-center items-center">
                <Avatar src="{team.imageUrl}" width="w-56" rounded="rounded-lg" background="bg-transparent"/>
            </div>
            <dl class="list-dl mt-5">
                <div>
                    <AboutCard title="Abbreviation" content={team.abbreviation}/>
                    <AboutCard title="City" content={team.city}/>
                    <AboutCard title="Conference" content={team.conference}/>
                    <AboutCard title="Division" content={team.division}/>
                </div>
            </dl>
            <div class="flex justify-center mt-5">
                <RadioGroup gap="gap-5" border="none" background="variant-filled-secondary"
                            active="variant-filled-primary"
                            hover="hover:variant-filled-primary">
                    <RadioItem bind:group={value} name="info" value="Roster">Roster</RadioItem>
                    <RadioItem bind:group={value} name="info" value="Stats">Stats</RadioItem>
                </RadioGroup>
            </div>
            {#if value === "Roster" }
                <div class="flex justify-between flex-wrap">
                    {#each team.players as player}
                        <PlayerPreview player={player}/>
                    {/each}
                </div>
            {/if}
        </section>
    </div>
</div>