<script lang="ts">
    import BracketLevel from "$lib/components/playoffs/BracketLevel.svelte";
    import type {GroupedPlayoffSeries} from "$lib/models/nba_data/playoffs/GroupedPlayoffSeries";
    import {PlayoffBorderTypes, playoffRounds} from "$lib/constants";
    import BracketMatchup from "$lib/components/playoffs/BracketMatchup.svelte";
    import type {PlayoffSeries} from "$lib/models/nba_data/playoffs/PlayoffSeries";
    import type {Team} from "$lib/models/nba_data/teams/Team";

    export let playoffBracket: GroupedPlayoffSeries;
    export let teamIndexes: { [key: string]: number }

    const firstIndexes = [1, 4]
    const secondIndexes = [3, 2]

    function isFirstStage(stage: string) {
        return stage === "Eastern Conference First Round"
            || stage === "Western Conference First Round"
    }

    function getTeamByFirstIndex(stage: string, winningTeam: Team, losingTeam: Team) {
        if (stage === "Finals") {
            return winningTeam;
        }

        let [x, y] = [teamIndexes[winningTeam.id], teamIndexes[losingTeam.id]];
        let [a, b] = [firstIndexes.indexOf(x), secondIndexes.indexOf(x)];
        let [c, d] = [firstIndexes.indexOf(y), secondIndexes.indexOf(y)];

        if (a === -1 && c === -1) {
            return b < d ? winningTeam : losingTeam;
        }
        if (a !== -1 && c !== -1) {
            return a < c ? winningTeam : losingTeam;
        }
        if (a !== -1) {
            return winningTeam;
        }
        return losingTeam;
    }

    function getFirstTeam(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank < matchup.losingTeamRank ? matchup.winningTeam : matchup.losingTeam;
        }
        return getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam)
    }

    function getSecondTeam(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank > matchup.losingTeamRank ? matchup.winningTeam : matchup.losingTeam;
        }
        return matchup.winningTeam.fullName === getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam).fullName ?
            matchup.losingTeam : matchup.winningTeam;
    }

    function getFirstTeamRank(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank < matchup.losingTeamRank ? matchup.winningTeamRank : matchup.losingTeamRank;
        }
        return matchup.winningTeam.fullName === getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam).fullName ?
            matchup.winningTeamRank : matchup.losingTeamRank;
    }

    function getSecondTeamRank(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank > matchup.losingTeamRank ? matchup.winningTeamRank : matchup.losingTeamRank;
        }
        return matchup.winningTeam.fullName === getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam).fullName ?
            matchup.losingTeamRank : matchup.winningTeamRank;
    }

    function getFirstTeamWins(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank < matchup.losingTeamRank ? matchup.winningTeamWins : matchup.losingTeamWins;
        }
        return matchup.winningTeam.fullName === getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam).fullName ?
            matchup.winningTeamWins : matchup.losingTeamWins;
    }

    function getSecondTeamWins(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank > matchup.losingTeamRank ? matchup.winningTeamWins : matchup.losingTeamWins;
        }
        return matchup.winningTeam.fullName === getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam).fullName ?
            matchup.losingTeamWins : matchup.winningTeamWins;
    }

    function getWinningTeamIndex(matchup: PlayoffSeries) {
        if (isFirstStage(matchup.stage)) {
            return matchup.winningTeamRank < matchup.losingTeamRank ? 0 : 1;
        }
        return matchup.winningTeam.fullName === getTeamByFirstIndex(matchup.stage, matchup.winningTeam, matchup.losingTeam).fullName ?
            0 : 1;
    }

    function getBorderType(matchup: PlayoffSeries) {
        if (matchup.stage === "Finals") {
            return PlayoffBorderTypes.NONE;
        }
        return matchup.stage.indexOf("Eastern") !== -1 ? PlayoffBorderTypes.LEFT : PlayoffBorderTypes.RIGHT;
    }
</script>

<style>
    .bracket-container {
        display: flex;
        padding: 5%;
        height: 90%;
        width: 100%;
    }
</style>

<div class="bracket-container">
    {#each playoffRounds as round}
        <BracketLevel>
            {#each playoffBracket.stageGrouping[round] as matchup}
                <BracketMatchup firstTeam={getFirstTeam(matchup)} secondTeam={getSecondTeam(matchup)}
                                firstTeamRank={getFirstTeamRank(matchup)} secondTeamRank={getSecondTeamRank(matchup)}
                                firstTeamWins={getFirstTeamWins(matchup)} secondTeamWins={getSecondTeamWins(matchup)}
                                winningTeamIndex={getWinningTeamIndex(matchup)}
                                borderType={getBorderType(matchup)}
                />
            {/each}
        </BracketLevel>
    {/each}
</div>
