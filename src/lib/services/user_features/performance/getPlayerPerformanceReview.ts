import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { PlayerPerformanceReview } from "$lib/models/user_features/performances/PlayerPerformanceReview";

export default async function getPlayerPerformanceReview(homeTeamId: number, visitorTeamId: number, playerId: string, date: string): Promise<PlayerPerformanceReview> {
    const axiosRes = await axiosInstance.get<Response<PlayerPerformanceReview>>(
        `user-features/player-performance-reviews?HomeTeamId=${homeTeamId}&VisitorTeamId=${visitorTeamId}&PlayerId=${playerId}&Date=${date}`);
    const response = axiosRes.data;
    return response.data;
}