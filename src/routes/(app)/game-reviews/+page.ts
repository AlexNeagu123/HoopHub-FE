import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getOwnGameReview from '$lib/services/user_features/game-reviews/getOwnGameReview';

export const load: PageLoad = async ({ url }) => {
    let game = await loadBoxScores(url);
    let gameWithBoxScore = game.gameWithBoxScore;

    let ownGameReview = await getOwnGameReview(gameWithBoxScore.homeTeam.apiId, gameWithBoxScore.visitorTeam.apiId, gameWithBoxScore.date);
    return { gameWithBoxScore, ownGameReview };
};