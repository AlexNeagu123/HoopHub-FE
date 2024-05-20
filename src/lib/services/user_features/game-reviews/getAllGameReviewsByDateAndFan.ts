import type { Response } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { GameReviewAverage } from "$lib/models/user_features/reviews/GameReviewAverage";

export default async function getAllGameReviewsByDateAndFan(
    date: string): Promise<GameReviewAverage[]> {
    const axiosRes = await axiosInstance.get<Response<GameReviewAverage[]>>(
        `user-features/game-reviews/by-date?Date=${date}`);
    const response = axiosRes.data;
    return response.data;
}