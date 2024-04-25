<script lang="ts">
    import StandingsHeader from "$lib/components/standings/StandingsHeader.svelte";
    import {StandingGroups} from "$lib/constants";
    import StandingsContent from "$lib/components/standings/StandingsContent.svelte";
    import type {Standings} from "$lib/models/nba_data/standings/Standings";
    import {fromOverallStrToPercentage, seasonFromStrToInt} from "$lib/utils/standings-utils";
    import getStandingsBySeason from "$lib/services/nba_data/standings/getStandingsBySeason";
    import {onMount} from "svelte";
    import LoadingIcon from "$lib/components/shared/LoadingIcon.svelte";

    const url = new URL(window.location.href);

    let season = url.searchParams.get("season");
    let group = StandingGroups.CONFERENCE;

    let standings: Standings[] = [];
    let isLoading = true;

    function completeStandingsStats() {
        standings.forEach(s => {
            s.teamFullName = s.team.fullName;
            s.winLossPercentage = fromOverallStrToPercentage(s.overall);
            s.teamPhotoUrl = s.team.imageUrl;
            s.teamId = s.team.id;
        })
    }

    async function onSeasonChange() {
        isLoading = true;
        standings = await getStandingsBySeason(seasonFromStrToInt(season));
        completeStandingsStats();
        isLoading = false;
    }

    onMount(async () => {
        await onSeasonChange();
    });
</script>

<StandingsHeader bind:season={season} bind:group={group} seasonChangeCallback={onSeasonChange}/>
{#if isLoading}
    <div class="flex justify-center">
        <LoadingIcon/>
    </div>
{:else}
    <StandingsContent group={group} standings={standings}/>
{/if}