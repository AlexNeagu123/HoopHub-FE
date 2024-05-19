import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getGameThreadsByDate from '$lib/services/user_features/game-threads/getGameThreadsByDate';
import type { GameThread } from '$lib/models/user_features/threads/GameThread';
import getOwnGameReview from '$lib/services/user_features/game-reviews/getOwnGameReview';

export const load: PageLoad = async ({ url }) => {
    let game = await loadBoxScores(url);
    let gameWithBoxScore = game.gameWithBoxScore;
    const date: string = url.searchParams.get('date')!;

    let gameThreads: GameThread[] = await getGameThreadsByDate(date);
    gameThreads = gameThreads.filter((gameThread) => gameWithBoxScore.homeTeam.apiId === gameThread.homeTeamId
        && gameWithBoxScore.visitorTeam.apiId === gameThread.visitorTeamId);

    let gameThread = gameThreads[0];
    let ownGameReview = await getOwnGameReview(gameWithBoxScore.homeTeam.apiId, gameWithBoxScore.visitorTeam.apiId, gameWithBoxScore.date);

    return { gameWithBoxScore, gameThread, ownGameReview };
};