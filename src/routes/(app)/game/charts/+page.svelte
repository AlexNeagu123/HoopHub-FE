<script lang="ts">
	import type { PageData } from './$types';
	import { aggregatePercentage, aggregateProperty, completeStats } from '$lib/utils/game-stats';
	import { onDestroy, onMount } from 'svelte';
	import * as echarts from 'echarts';
	import GameWithBoxScore from '$lib/components/games/GameWithBoxScoreC.svelte';
	import Leaders from '$lib/components/games/Leaders.svelte';
	import { liveBoxScoreStore } from '$lib/stores/live-games.store';
	import type { Unsubscriber } from 'svelte/store';
	import { GamePageTypes } from '$lib/constants';

	type EChartsOption = echarts.EChartsOption;

	export let data: PageData;

	let gameDetails = data.gameWithBoxScore;

	$: homeTeamPlayerStats = gameDetails.homeTeam.players;
	$: visitorTeamPlayerStats = gameDetails.visitorTeam.players;

	completeStats(gameDetails.homeTeam.players);
	completeStats(gameDetails.visitorTeam.players);

	function updateChart() {
		const chartDom = document.getElementById('chart-container')!;
		const myChart = echarts.init(chartDom);
		let option: EChartsOption;

		option = {
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					[
						'product',
						gameDetails.visitorTeam.fullName.split(' ').pop(),
						gameDetails.homeTeam.fullName.split(' ').pop()
					],
					['Points', gameDetails.visitorTeamScore, gameDetails.homeTeamScore],
					[
						'Rebounds',
						aggregateProperty(visitorTeamPlayerStats, 'reb'),
						aggregateProperty(homeTeamPlayerStats, 'reb')
					],
					[
						'Assists',
						aggregateProperty(visitorTeamPlayerStats, 'ast'),
						aggregateProperty(homeTeamPlayerStats, 'ast')
					],
					[
						'Blocks',
						aggregateProperty(visitorTeamPlayerStats, 'blk'),
						aggregateProperty(homeTeamPlayerStats, 'blk')
					],
					[
						'Steals',
						aggregateProperty(visitorTeamPlayerStats, 'stl'),
						aggregateProperty(homeTeamPlayerStats, 'stl')
					],
					[
						'Turnovers',
						aggregateProperty(visitorTeamPlayerStats, 'turnover'),
						aggregateProperty(homeTeamPlayerStats, 'turnover')
					],
					[
						'FG%',
						aggregatePercentage(visitorTeamPlayerStats, 'fgm', 'fga'),
						aggregatePercentage(homeTeamPlayerStats, 'fgm', 'fga')
					],
					[
						'3P%',
						aggregatePercentage(visitorTeamPlayerStats, 'fg3m', 'fg3a'),
						aggregatePercentage(homeTeamPlayerStats, 'fg3m', 'fg3a')
					],
					[
						'FT%',
						aggregatePercentage(visitorTeamPlayerStats, 'ftm', 'fta'),
						aggregatePercentage(homeTeamPlayerStats, 'ftm', 'fta')
					]
				]
			},
			xAxis: { type: 'category' },
			yAxis: {},
			series: [{ type: 'bar' }, { type: 'bar' }]
		};

		option && myChart.setOption(option);
	}

	let unsubscribe: Unsubscriber | null = null;

	onMount(() => {
		updateChart();
		unsubscribe = liveBoxScoreStore.subscribe((boxScoreList) => {
			boxScoreList.forEach((boxScore) => {
				if (
					boxScore.homeTeam.apiId !== gameDetails.homeTeam.apiId ||
					boxScore.visitorTeam.apiId !== gameDetails.visitorTeam.apiId ||
					boxScore.date !== gameDetails.date
				) {
					return;
				}
				if (boxScore.status.includes('Qtr') || boxScore.status.includes('Halftime')) {
					gameDetails = boxScore;
					completeStats(gameDetails.homeTeam.players);
					completeStats(gameDetails.visitorTeam.players);
					updateChart();
				}
			});
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<GameWithBoxScore {gameDetails} pageType={GamePageTypes.CHARTS}>
	<div id="chart-container" class="w-full h-[475px]"></div>
	<Leaders game={gameDetails} />
</GameWithBoxScore>
