import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { GameReview } from "$lib/models/user_features/reviews/GameReview";

export default async function addGameReview(
    rating: number,
    content: string,
    homeTeamId: number,
    visitorTeamId: number,
    date: string
): Promise<Response<GameReview>> {
    const payload = {
        rating: rating,
        content: content,
        homeTeamId: homeTeamId,
        visitorTeamId: visitorTeamId,
        date: date
    };

    const axiosRes = await axiosInstance.post<Response<GameReview>>(
        "user-features/game-reviews",
        payload,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
    );

    const response = axiosRes.data;
    return response;
}