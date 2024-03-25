<script lang="ts">
    import type {Team} from "$lib/models/nba_data/teams/Team";
    import AboutCard from "$lib/components/shared/AboutCard.svelte";
    import StatCard from "$lib/components/shared/StatCard.svelte";
    import TeamHeader from "$lib/components/teams/TeamHeader.svelte";
    import {TabAnchor, TabGroup} from "@skeletonlabs/skeleton";
    import {AppRoute} from "$lib/constants";
    import {page} from '$app/stores';

    let id = $page.params.id;

    export let team: Team;
    export let pageType: string;
    $: isRoster = pageType == "roster";
</script>

<div class="flex justify-center">
    <div class="card variant-filled-primary m-10 w-3/4 p-5 px-10 drop-shadow">
        <div class="flex items-center">
            <TeamHeader team={team}/>

            <div class="flex ml-auto text-center">
                <StatCard title="W-L %" border={true} content={team.teamBio[0].winLossRatio}/>
                <StatCard title="ORTG" border={true} content={team.teamBio[0].oRtg}/>
                <StatCard title="DRTG" border={true} content={team.teamBio[0].dRtg}/>
                <StatCard title="PACE" border={true} content={team.teamBio[0].pace}/>
                <StatCard title="SRS" border={false} content={team.teamBio[0].srs}/>
            </div>
        </div>

        <dl class="list-dl text-center mt-5">
            <div>
                <AboutCard title="Abbreviation" content={team.abbreviation}/>
                <AboutCard title="City" content={team.city}/>
                <AboutCard title="Conference" content={team.conference}/>
                <AboutCard title="Division" content={team.division}/>
            </div>
        </dl>

        <div class="mt-5">
            <TabGroup border="none" justify="justify-start"
                      active="hover:bg-secondary-500 border-b-2 border-secondary-600 font-semibold"
                      hover="hover:bg-secondary-500">
                <TabAnchor href="{AppRoute.TEAM}/{id}" selected={isRoster}>Roster</TabAnchor>
                <TabAnchor href="{AppRoute.TEAM}/{id}/bio" selected={!isRoster}>History</TabAnchor>
            </TabGroup>
        </div>

        <slot/>
    </div>
</div>