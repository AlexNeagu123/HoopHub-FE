<script lang="ts">
    import PlayoffBracket from "$lib/components/playoffs/PlayoffBracket.svelte";
    import PlayoffHeader from "$lib/components/playoffs/PlayoffHeader.svelte";

    import {seasonFromStrToInt} from "$lib/utils/standings-utils";
    import getPlayoffsBySeason from "$lib/services/nba_data/playoffs/getPlayoffsBySeason";
    import type {GroupedPlayoffSeries} from "$lib/models/nba_data/playoffs/GroupedPlayoffSeries";
    import {onMount} from "svelte";
    import LoadingIcon from "$lib/components/shared/LoadingIcon.svelte";

    const url = new URL(window.location.href);
    let season = url.searchParams.get("season");

    let playoffBracket: GroupedPlayoffSeries
    let teamIndexes: { [key: string]: number } = {}

    let isLoading = true;

    function completePlayoffBracket() {
        const playoffRounds = ["Eastern Conference First Round", "Western Conference First Round"];
        playoffRounds.forEach(pr => {
            [playoffBracket.stageGrouping[pr][3], playoffBracket.stageGrouping[pr][1]] = [playoffBracket.stageGrouping[pr][1], playoffBracket.stageGrouping[pr][3]];
            playoffBracket.stageGrouping[pr].forEach(matchup => {
                teamIndexes[matchup.winningTeam.id] = Math.min(matchup.winningTeamRank, matchup.losingTeamRank);
                teamIndexes[matchup.losingTeam.id] = Math.min(matchup.winningTeamRank, matchup.losingTeamRank);
            });
        });
    }

    async function onSeasonChange() {
        isLoading = true;
        playoffBracket = await getPlayoffsBySeason(seasonFromStrToInt(season!));
        completePlayoffBracket();
        isLoading = false;
    }

    onMount(async () => {
        await onSeasonChange();
    });
</script>

<PlayoffHeader bind:season={season} seasonChangeCallback={onSeasonChange}/>
{#if isLoading}
    <div class="flex justify-center">
        <LoadingIcon/>
    </div>
{:else}
    <PlayoffBracket playoffBracket={playoffBracket} teamIndexes={teamIndexes}/>
{/if}