import type { Response } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { LocalStoredBoxScoresDto } from "$lib/models/nba_data/box-scores/LocalStoredBoxScores";

export default async function getRecentBoxScores(): Promise<LocalStoredBoxScoresDto[]> {
    const axiosRes =
        await axiosInstance.get<Response<LocalStoredBoxScoresDto[]>>('nba-data/games/box-scores/recent');
    const response = axiosRes.data;
    return response.data;
}