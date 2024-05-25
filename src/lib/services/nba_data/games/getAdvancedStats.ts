import { axiosInstance } from "$lib/constants";
import type { AdvancedStatsEntry } from "$lib/models/nba_data/box-scores/AdvancedStatsEntry";
import type { Response } from "$lib/models/common/Response"

export default async function getAdvancedStatsByGame(date: string, homeTeamId: number, visitorTeamId: number): Promise<AdvancedStatsEntry[]> {
    const axiosRes =
        await axiosInstance.get<Response<AdvancedStatsEntry[]>>(`nba-data/games/advanced-stats?date=${date}&homeTeamId=${homeTeamId}&visitorTeamId=${visitorTeamId}`,
            { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
        );

    const response = axiosRes.data;
    return response.data ?? [];
}