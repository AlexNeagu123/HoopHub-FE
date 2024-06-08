import type { PageLoad } from './$types';
import getOwnGameReview from '$lib/services/user_features/game-reviews/getOwnGameReview';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import loadBoxScores from '$lib/utils/box-score-loader';
import getGameThreadsByDate from '$lib/services/user_features/game-threads/getGameThreadsByDate';

export const load: PageLoad = async ({ url }) => {
    const homeTeamId: number = Number(url.searchParams.get('homeTeam'));
    const visitorTeamId: number = Number(url.searchParams.get('visitorTeam'));
    const date: string = url.searchParams.get('date')!;

    const [game, gameThreads, gameReviewAverages, ownGameReview] = await Promise.all([
        loadBoxScores(url),
        getGameThreadsByDate(date),
        getAllGameReviewsByDateAndFan(date),
        getOwnGameReview(homeTeamId, visitorTeamId, date)
    ]);

    const gameWithBoxScore = game.gameWithBoxScore;
    const filteredGameThreads = gameThreads.filter((gameThread) =>
        gameWithBoxScore.homeTeam.apiId === gameThread.homeTeamId &&
        gameWithBoxScore.visitorTeam.apiId === gameThread.visitorTeamId
    );

    const gameThread = filteredGameThreads[0];

    return {
        gameWithBoxScore,
        gameThread,
        gameReviewAverages,
        ownGameReview,
    };
};
