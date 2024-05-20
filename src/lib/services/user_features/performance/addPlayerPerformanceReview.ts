import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { PlayerPerformanceReview } from "$lib/models/user_features/performances/PlayerPerformanceReview";

export default async function addPlayerPerformanceReview(
    rating: number,
    homeTeamId: number,
    visitorTeamId: number,
    date: string,
    playerId: string,
): Promise<Response<PlayerPerformanceReview>> {
    const payload = {
        rating: rating,
        playerId: playerId,
        homeTeamId: homeTeamId,
        visitorTeamId: visitorTeamId,
        date: date
    };

    const axiosRes = await axiosInstance.post<Response<PlayerPerformanceReview>>(
        "user-features/player-performance-reviews",
        payload,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
    );

    const response = axiosRes.data;
    return response;
}