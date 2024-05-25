import type { Response } from "$lib/models/common/Response"
import type { GameWithBoxScore } from "$lib/models/nba_data/box-scores/GameWithBoxScore";
import { axiosInstance } from "$lib/constants";

export default async function getBoxScoreByGame(date: string, homeTeamId: number, visitorTeamId: number): Promise<GameWithBoxScore> {
    const axiosRes =
        await axiosInstance.get<Response<GameWithBoxScore>>(`nba-data/games/box-score?date=${date}&homeTeamId=${homeTeamId}&visitorTeamId=${visitorTeamId}`);
    const response = axiosRes.data;
    return response.data;
}