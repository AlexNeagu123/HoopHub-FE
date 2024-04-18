<script lang="ts">
    import type {PageData} from './$types';
    import TeamExpanded from "$lib/components/teams/TeamExpanded.svelte";
    import {onMount} from "svelte";
    import LoadingIcon from "$lib/components/shared/LoadingIcon.svelte";
    import {tableMapperValues} from "@skeletonlabs/skeleton";
    import type {LatestTeamBoxScore} from "$lib/models/nba_data/box-scores/LatestTeamBoxScore";
    import getLatestBoxScoresByTeam from "$lib/services/nba_data/games/getLatestBoxScoresByTeam";
    import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
    import TeamLatestGamesTable from "$lib/components/shared/TeamLatestGamesTable.svelte";

    export let data: PageData;
    let isLoading: boolean = true;

    let latestBoxScores: GameWithBoxScore[] = [];
    let latestTeamBoxScores: LatestTeamBoxScore[] = [];

    const hasWon: boolean[] = [];

    const headFields: string[] = ['Date', 'Against', 'Result', 'oppTeamPhoto', 'oppTeamId', 'homeTeamId', 'visitorTeamId'];
    const bodyFields: string[] = ['date', 'oppTeamAbbr', 'result', 'oppTeamPhoto', 'oppTeamId', 'homeTeamId', 'visitorTeamId'];

    $: table = {
        head: headFields,
        body: tableMapperValues(latestTeamBoxScores, bodyFields),
    };

    onMount(async () => {
        isLoading = true;
        let teamBoxScores: LatestTeamBoxScore[] = [];

        latestBoxScores = await getLatestBoxScoresByTeam(data.team.id);
        console.log(data.team.id);
        console.log(latestBoxScores);

        latestBoxScores.forEach(bs => {
            if (bs.homeTeam.id === data.team.id) {
                const result = (bs.homeTeamScore! < bs.visitorTeamScore! ? 'Lost ' : 'Won ') + `${bs.homeTeamScore}-${bs.visitorTeamScore}`;
                hasWon.push(result.indexOf("Won") !== -1);
                teamBoxScores.push({
                    date: bs.date,
                    oppTeamAbbr: bs.visitorTeam.abbreviation!,
                    result: result,
                    oppTeamPhoto: bs.visitorTeam.imageUrl!,
                    oppTeamId: bs.visitorTeam.id,
                    homeTeamId: bs.homeTeam.apiId,
                    visitorTeamId: bs.visitorTeam.apiId
                })
            } else {
                const result = (bs.homeTeamScore! < bs.visitorTeamScore! ? 'Won ' : 'Lost ') + `${bs.visitorTeamScore}-${bs.homeTeamScore}`;
                hasWon.push(result.indexOf("Won") !== -1);
                teamBoxScores.push({
                    date: bs.date,
                    oppTeamAbbr: bs.homeTeam.abbreviation!,
                    result: result,
                    oppTeamPhoto: bs.homeTeam.imageUrl!,
                    oppTeamId: bs.homeTeam.id,
                    homeTeamId: bs.homeTeam.apiId,
                    visitorTeamId: bs.visitorTeam.apiId
                })
            }
        });

        console.log(teamBoxScores);
        latestTeamBoxScores = teamBoxScores;
        isLoading = false;
    });
</script>

<TeamExpanded team={data.team} pageType="latest">
    {#if isLoading}
        <LoadingIcon/>
    {:else}
        <div class="w-3/4">
            <TeamLatestGamesTable table={table} hasWon={hasWon}/>
        </div>
    {/if}
</TeamExpanded>