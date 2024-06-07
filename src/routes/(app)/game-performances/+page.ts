import type { PageLoad } from './$types';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import getPlayerPerformanceAveragesByGame from '$lib/services/user_features/performance/getPlayerPerformanceAveragesByGame';
import loadBoxScores from '$lib/utils/box-score-loader';

export const load: PageLoad = async ({ url }) => {
    const game = await loadBoxScores(url);
    const { date, homeTeam, visitorTeam } = game.gameWithBoxScore;

    const [gameReviewAverages, averagePerformanceRatings] = await Promise.all([
        getAllGameReviewsByDateAndFan(date),
        getPlayerPerformanceAveragesByGame(homeTeam.apiId, visitorTeam.apiId, date)
    ]);

    return { gameWithBoxScore: game.gameWithBoxScore, gameReviewAverages, averagePerformanceRatings };
};
