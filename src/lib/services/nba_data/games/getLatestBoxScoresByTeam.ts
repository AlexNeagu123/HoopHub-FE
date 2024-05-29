import type { Response } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { LocalStoredGame } from "$lib/models/nba_data/games/LocalStoredGame";

export default async function getLatestBoxScoresByTeam(teamId: string, gameCount: number): Promise<LocalStoredGame[]> {
    const axiosRes =
        await axiosInstance.get<Response<LocalStoredGame[]>>(`nba-data/games/${teamId}?gameCount=${gameCount}`);
    const response = axiosRes.data;
    return response.data;
}