import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getGameThreadsByDate from '$lib/services/user_features/game-threads/getGameThreadsByDate';
import type { GameThread } from '$lib/models/user_features/threads/GameThread';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';

export const load: PageLoad = async ({ url }) => {
    const date: string = url.searchParams.get('date')!;
    
    const gamePromise = loadBoxScores(url);
    const gameThreadsPromise = getGameThreadsByDate(date);

    const [game, gameThreads] = await Promise.all([gamePromise, gameThreadsPromise]);
    
    const gameWithBoxScore = game.gameWithBoxScore;
    const filteredGameThreads = gameThreads.filter((gameThread) => 
        gameWithBoxScore.homeTeam.apiId === gameThread.homeTeamId && 
        gameWithBoxScore.visitorTeam.apiId === gameThread.visitorTeamId
    );
    
    const gameThread = filteredGameThreads[0];
    const gameReviewAveragesPromise = getAllGameReviewsByDateAndFan(gameWithBoxScore.date);
    
    const gameReviewAverages = await gameReviewAveragesPromise;

    return { gameWithBoxScore, gameThread, gameReviewAverages };
};
