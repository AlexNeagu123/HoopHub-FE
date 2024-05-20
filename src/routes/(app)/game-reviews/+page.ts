import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getOwnGameReview from '$lib/services/user_features/game-reviews/getOwnGameReview';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';

export const load: PageLoad = async ({ url }) => {
    let game = await loadBoxScores(url);
    let gameWithBoxScore = game.gameWithBoxScore;
    let gameReviewAverages = await getAllGameReviewsByDateAndFan(gameWithBoxScore.date);
    let ownGameReview = await getOwnGameReview(gameWithBoxScore.homeTeam.apiId, gameWithBoxScore.visitorTeam.apiId, gameWithBoxScore.date);
    return { gameWithBoxScore, ownGameReview, gameReviewAverages };
};