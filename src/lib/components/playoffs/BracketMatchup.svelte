<script lang="ts">
    import type {Team} from "$lib/models/nba_data/teams/Team";
    import {AppRoute, PlayoffBorderTypes} from "$lib/constants";
    import {goto} from '$app/navigation';

    export let firstTeam: Team;
    export let secondTeam: Team;
    export let firstTeamWins: number;
    export let secondTeamWins: number;
    export let firstTeamRank: number;
    export let secondTeamRank: number;
    export let winningTeamIndex: number = 0;
    export let borderType: number = PlayoffBorderTypes.NONE;

    function onTeamClicked(clickedTeam: Team) {
        goto(`${AppRoute.TEAM}/${clickedTeam.id}`);
    }
</script>

<style>
    .bracket-team {
        height: 45%;
        width: 100%;
        background-color: #F5F5F5;
        box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
        display: flex;
        flex-direction: row;
    }

    .bracket-team:hover {
        background-color: #78aacd;
    }

    .bracket-matchup {
        width: 90%;
        margin: auto;
        max-height: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .bracket-score {
        font-size: .75em;
        padding: 1em;
        line-height: 1.5em;
        color: #2B2B2B;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .bracket-name {
        width: 75%;
        font-size: .75em;
        padding: 1em;
        line-height: 1.5em;
        color: #2B2B2B;
        text-align: center;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>

<div class="bracket-matchup">
    <div class="bracket-team cursor-pointer hover:bg-secondary-700
    {winningTeamIndex === 0 ? 'font-bold' : 'opacity-70'}
    {winningTeamIndex === 0 && borderType === PlayoffBorderTypes.RIGHT ? 'border-r-4 border-r-tertiary-900' : ''}
    {winningTeamIndex === 0 && borderType === PlayoffBorderTypes.LEFT ? 'border-l-4 border-l-tertiary-900' : ''}"
         on:click={() => onTeamClicked(firstTeam)}>
        <div class="bracket-name font-semibold">{firstTeamRank}.
            <img class="w-[28%] rounded-full bg-transparent mx-1" alt="AB"
                 src={firstTeam.imageUrl}/>
            {firstTeam.fullName.split(" ").pop()}</div>
        <div class="bracket-score">{firstTeamWins}</div>
    </div>
    <div class="bracket-team cursor-pointer hover:bg-secondary-700
    {winningTeamIndex === 1 ? 'font-bold' : 'opacity-70'}
    {winningTeamIndex === 1 && borderType === PlayoffBorderTypes.RIGHT ? 'border-r-4 border-r-tertiary-900' : ''}
    {winningTeamIndex === 1 && borderType === PlayoffBorderTypes.LEFT ? 'border-l-4 border-l-tertiary-900' : ''}"
         on:click={() => onTeamClicked(secondTeam)}>
        <div class="bracket-name font-semibold">{secondTeamRank}.
            <img class="w-[28%] rounded-full bg-transparent mx-1" alt="AB"
                 src={secondTeam.imageUrl}/>
            {secondTeam.fullName.split(" ").pop()}</div>
        <div class="bracket-score">{secondTeamWins}</div>
    </div>
</div>