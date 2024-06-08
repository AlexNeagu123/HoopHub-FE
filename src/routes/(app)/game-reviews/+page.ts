import type { PageLoad } from './$types';
import getOwnGameReview from '$lib/services/user_features/game-reviews/getOwnGameReview';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import loadBoxScores from '$lib/utils/box-score-loader';

export const load: PageLoad = async ({ url }) => {
    const homeTeamId: number = Number(url.searchParams.get('homeTeam'));
    const visitorTeamId: number = Number(url.searchParams.get('visitorTeam'));
    const date: string = url.searchParams.get('date')!;


    const [game, gameReviewAverages, ownGameReview] = await Promise.all([
        loadBoxScores(url),
        getAllGameReviewsByDateAndFan(date),
        getOwnGameReview(homeTeamId, visitorTeamId, date)
    ]);

    return {
        gameWithBoxScore: game.gameWithBoxScore,
        ownGameReview,
        gameReviewAverages,
    };
};
