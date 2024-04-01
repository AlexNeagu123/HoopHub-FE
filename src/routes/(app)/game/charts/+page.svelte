<script lang="ts">
    import type {PageData} from './$types';
    import {aggregatePercentage, aggregateProperty, completeStats, findMaxByProperty} from "$lib/utils/game-stats";
    import {onMount} from "svelte";
    import * as echarts from 'echarts';
    import GameWithBoxScore from "$lib/components/games/GameWithBoxScore.svelte";
    import Leaders from "$lib/components/games/Leaders.svelte";
    type EChartsOption = echarts.EChartsOption;

    export let data: PageData;

    let gameDetails = data.gameWithBoxScore;
    let homeTeamPlayerStats = gameDetails.homeTeam.players;
    let visitorTeamPlayerStats = gameDetails.visitorTeam.players;

    completeStats(gameDetails.homeTeam.players);
    completeStats(gameDetails.visitorTeam.players);

    onMount(() => {
        const chartDom = document.getElementById('chart-container')!;
        const myChart = echarts.init(chartDom);
        let option: EChartsOption;

        option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', gameDetails.visitorTeam.fullName.split(' ').pop(), gameDetails.homeTeam.fullName.split(' ').pop()],
                    ['Points', gameDetails.visitorTeamScore, gameDetails.homeTeamScore],
                    ['Rebounds', aggregateProperty(visitorTeamPlayerStats, 'reb'), aggregateProperty(homeTeamPlayerStats, 'reb')],
                    ['Assists', aggregateProperty(visitorTeamPlayerStats, 'ast'), aggregateProperty(homeTeamPlayerStats, 'ast')],
                    ['Blocks', aggregateProperty(visitorTeamPlayerStats, 'blk'), aggregateProperty(homeTeamPlayerStats, 'blk')],
                    ['Steals', aggregateProperty(visitorTeamPlayerStats, 'stl'), aggregateProperty(homeTeamPlayerStats, 'stl')],
                    ['Turnovers', aggregateProperty(visitorTeamPlayerStats, 'turnover'), aggregateProperty(homeTeamPlayerStats, 'turnover')],
                    ['FG%', aggregatePercentage(visitorTeamPlayerStats, 'fgm', 'fga'), aggregatePercentage(homeTeamPlayerStats, 'fgm', 'fga')],
                    ['3P%', aggregatePercentage(visitorTeamPlayerStats, 'fg3m', 'fg3a'), aggregatePercentage(homeTeamPlayerStats, 'fg3m', 'fg3a')],
                    ['FT%', aggregatePercentage(visitorTeamPlayerStats, 'ftm', 'fta'), aggregatePercentage(homeTeamPlayerStats, 'ftm', 'fta')]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{ type: 'bar' }, { type: 'bar' }]
        };

        option && myChart.setOption(option);
    });
</script>

<GameWithBoxScore gameDetails={gameDetails} pageType="charts">
    <div id="chart-container" class="w-full h-[475px]">
    </div>
    <Leaders game={gameDetails}/>
</GameWithBoxScore>