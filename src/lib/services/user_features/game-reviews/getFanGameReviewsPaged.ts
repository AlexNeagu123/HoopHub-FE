import type { PagedResponse } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { GameReview } from "$lib/models/user_features/reviews/GameReview";

export default async function getFanGameReviewsPaged(
    fanId: string | null,
    page: number,
    pageSize: number) {
    const url = fanId ? `user-features/game-reviews/fans?FanId=${fanId}&Page=${page}&PageSize=${pageSize}` :
        `user-features/game-reviews/fans?Page=${page}&PageSize=${pageSize}`;

    const axiosRes = await axiosInstance.get<PagedResponse<GameReview[]>>(
        `${url}`);

    const response = axiosRes.data;
    return response.data;
}