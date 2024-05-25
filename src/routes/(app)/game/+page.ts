import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import getAdvancedStatsByGame from '$lib/services/nba_data/games/getAdvancedStats';

export const load: PageLoad = async ({ url }) => {
    let game = await loadBoxScores(url);
    let gameWithBoxScore = game.gameWithBoxScore;
    let gameReviewAverages = await getAllGameReviewsByDateAndFan(gameWithBoxScore.date);
    let advancedStatsEntries = await getAdvancedStatsByGame(gameWithBoxScore.date, gameWithBoxScore.homeTeam.apiId, gameWithBoxScore.visitorTeam.apiId);
    console.log(advancedStatsEntries);
    return { gameWithBoxScore, gameReviewAverages, advancedStatsEntries };
};