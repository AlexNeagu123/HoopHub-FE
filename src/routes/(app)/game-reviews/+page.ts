import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getOwnGameReview from '$lib/services/user_features/game-reviews/getOwnGameReview';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';

export const load: PageLoad = async ({ url }) => {
    const gamePromise = loadBoxScores(url);

    const game = await gamePromise;
    const { date, homeTeam, visitorTeam } = game.gameWithBoxScore;

    const [gameReviewAverages, ownGameReview] = await Promise.all([
        getAllGameReviewsByDateAndFan(date),
        getOwnGameReview(homeTeam.apiId, visitorTeam.apiId, date)
    ]);

    return {
        gameWithBoxScore: game.gameWithBoxScore,
        ownGameReview,
        gameReviewAverages
    };
};
