import type { PageLoad } from './$types';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import getPlayerPerformanceAveragesByGame from '$lib/services/user_features/performance/getPlayerPerformanceAveragesByGame';
import loadBoxScores from '$lib/utils/box-score-loader';
import getAllPlayers from '$lib/services/nba_data/players/getAllPlayers';

export const load: PageLoad = async ({ url }) => {
    const homeTeamId: number = Number(url.searchParams.get('homeTeam'));
    const visitorTeamId: number = Number(url.searchParams.get('visitorTeam'));
    const date: string = url.searchParams.get('date')!;

    const [game, gameReviewAverages, averagePerformanceRatings, allPlayers] = await Promise.all([
        loadBoxScores(url),
        getAllGameReviewsByDateAndFan(date),
        getPlayerPerformanceAveragesByGame(homeTeamId, visitorTeamId, date),
        getAllPlayers()
    ]);

    return { gameWithBoxScore: game.gameWithBoxScore, gameReviewAverages, averagePerformanceRatings, allPlayers };
};
