import type {Response} from "$lib/models/common/Response"
import axios from 'axios'
import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";

export default async function getBoxScoreByGame(date: string, homeTeamId: number, visitorTeamId: number): Promise<GameWithBoxScore> {
    const axiosRes =
        await axios.get<Response<GameWithBoxScore>>(`nba-data/games/box-score?date=${date}&homeTeamId=${homeTeamId}&visitorTeamId=${visitorTeamId}`);
    const response = axiosRes.data;
    return response.data;
}