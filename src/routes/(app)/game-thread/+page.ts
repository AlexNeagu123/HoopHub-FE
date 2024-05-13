import type { PageLoad } from './$types';
import loadBoxScores from "../../../lib/utils/box-score-loader";
import getGameThreadsByDate from '$lib/services/user_features/game-threads/getGameThreadsByDate';
import type { GameThread } from '$lib/models/user_features/threads/GameThread';

export const load: PageLoad = async ({ url }) => {
    let game = await loadBoxScores(url);
    let gameWithBoxScore = game.gameWithBoxScore;
    const date: string = url.searchParams.get('date')!;
    let gameThreads: GameThread[] = await getGameThreadsByDate(date);

    gameThreads = gameThreads.filter((gameThread) => gameWithBoxScore.homeTeam.id === gameThread.homeTeamId
        && gameWithBoxScore.visitorTeam.id === gameThread.visitorTeamId);

    let gameThread = gameThreads[0];
    return { gameWithBoxScore, gameThread };
};