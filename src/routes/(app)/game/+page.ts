import type { PageLoad } from './$types';
import getAllGameReviewsByDateAndFan from '$lib/services/user_features/game-reviews/getAllGameReviewsByDateAndFan';
import getAdvancedStatsByGame from '$lib/services/nba_data/games/getAdvancedStats';
import getAllPlayers from '$lib/services/nba_data/players/getAllPlayers';
import loadBoxScores from '$lib/utils/box-score-loader';

export const load: PageLoad = async ({ url }) => {
    const homeTeamId: number = Number(url.searchParams.get('homeTeam'));
    const visitorTeamId: number = Number(url.searchParams.get('visitorTeam'));
    const date: string = url.searchParams.get('date')!;

    const [game, gameReviewAverages, advancedStatsEntries, allPlayers] = await Promise.all([
        loadBoxScores(url),
        getAllGameReviewsByDateAndFan(date),
        getAdvancedStatsByGame(date, homeTeamId, visitorTeamId),
        getAllPlayers()
    ]);

    return { gameWithBoxScore: game.gameWithBoxScore, gameReviewAverages, advancedStatsEntries, allPlayers };
};
