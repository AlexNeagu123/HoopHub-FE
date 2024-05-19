import type { Response } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { GameReview } from "$lib/models/user_features/reviews/GameReview";

export default async function getAllGameReviewsByDateAndFan(
    date: string): Promise<GameReview[]> {
    const axiosRes = await axiosInstance.get<Response<GameReview[]>>(
        `user-features/game-reviews/by-date?Date=${date}`);
    const response = axiosRes.data;
    return response.data;
}