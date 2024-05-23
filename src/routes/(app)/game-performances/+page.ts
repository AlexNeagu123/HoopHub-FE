import type { PageLoad } from './$types';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import getPlayerPerformanceAveragesByGame from '$lib/services/user_features/performance/getPlayerPerformanceAveragesByGame';
import loadBoxScores from '$lib/utils/box-score-loader';

export const load: PageLoad = async ({ url }) => {
    let game = await loadBoxScores(url);
    let gameWithBoxScore = game.gameWithBoxScore;
    let gameReviewAverages = await getAllGameReviewsByDateAndFan(gameWithBoxScore.date);
    let averagePerformanceRatings = await getPlayerPerformanceAveragesByGame(gameWithBoxScore.homeTeam.apiId, gameWithBoxScore.visitorTeam.apiId, gameWithBoxScore.date);
    return { gameWithBoxScore, gameReviewAverages, averagePerformanceRatings };
};