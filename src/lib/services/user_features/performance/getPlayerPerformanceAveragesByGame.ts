import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { PlayerPerformanceAverage } from "$lib/models/user_features/performances/PlayerPerformanceAverage";

export default async function getPlayerPerformanceAveragesByGame(homeTeamId: number, visitorTeamId: number, date: string): Promise<PlayerPerformanceAverage[]> {
    const axiosRes = await axiosInstance.get<Response<PlayerPerformanceAverage[]>>(
        `user-features/player-performance-reviews/by-game?HomeTeamId=${homeTeamId}&VisitorTeamId=${visitorTeamId}&Date=${date}`);
    const response = axiosRes.data;
    return response.data;
}