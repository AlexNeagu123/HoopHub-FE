import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import getAdvancedStatsByGame from '$lib/services/nba_data/games/getAdvancedStats';

export const load: PageLoad = async ({ url }) => {
    const game = await loadBoxScores(url);
    const { date, homeTeam, visitorTeam } = game.gameWithBoxScore;

    const [gameReviewAverages, advancedStatsEntries] = await Promise.all([
        getAllGameReviewsByDateAndFan(date),
        getAdvancedStatsByGame(date, homeTeam.apiId, visitorTeam.apiId)
    ]);

    return { gameWithBoxScore: game.gameWithBoxScore, gameReviewAverages, advancedStatsEntries };
};
