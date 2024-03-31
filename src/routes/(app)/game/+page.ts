import type {PageLoad} from './$types';
import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
import getBoxScoreByGame from "$lib/services/nba_data/games/getBoxScoreByGame";

export const load: PageLoad = async ({url}) => {
    const homeTeamId: number = Number(url.searchParams.get('homeTeam'));
    const visitorTeamId: number = Number(url.searchParams.get('visitorTeam'));
    const date: string = url.searchParams.get('date')!;
    const gameWithBoxScore: GameWithBoxScore = await getBoxScoreByGame(date, homeTeamId, visitorTeamId);

    gameWithBoxScore.homeTeam.players.forEach(e => {
        e.playerFullName = e.player?.firstName + " " + e.player?.lastName;
        e.playerImageUrl = e.player?.imageUrl;
    })

    gameWithBoxScore.visitorTeam.players.forEach(e => {
        e.playerFullName = e.player?.firstName + " " + e.player?.lastName;
        e.playerImageUrl = e.player?.imageUrl;
    })

    return {gameWithBoxScore}
};