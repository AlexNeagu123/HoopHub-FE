import type { PagedResponse } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { GameReview } from "$lib/models/user_features/reviews/GameReview";

export default async function getOwnGameReviewsPaged(
    page: number,
    pageSize: number) {
    const axiosRes = await axiosInstance.get<PagedResponse<GameReview[]>>(
        `user-features/game-reviews/own?Page=${page}&PageSize=${pageSize}`);
    const response = axiosRes.data;
    return response.data;
}