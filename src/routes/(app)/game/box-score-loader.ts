import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
import getBoxScoreByGame from "$lib/services/nba_data/games/getBoxScoreByGame";

export default async function loadBoxScores(url: URL) {
    const homeTeamId: number = Number(url.searchParams.get('homeTeam'));
    const visitorTeamId: number = Number(url.searchParams.get('visitorTeam'));
    const date: string = url.searchParams.get('date')!;
    const gameWithBoxScore: GameWithBoxScore = await getBoxScoreByGame(date, homeTeamId, visitorTeamId);

    return {gameWithBoxScore}
}