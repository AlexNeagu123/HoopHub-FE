import type { Response } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { LocalStoredBoxScoresDto } from "$lib/models/nba_data/box-scores/LocalStoredBoxScores";

export default async function getLatestBoxScoresByPlayer(playerId: string, gameCount: number): Promise<LocalStoredBoxScoresDto[]> {
    const axiosRes =
        await axiosInstance.get<Response<LocalStoredBoxScoresDto[]>>(`nba-data/games/box-scores/${playerId}?gameCount=${gameCount}`);
    const response = axiosRes.data;
    return response.data;
}