import type { PagedResponse } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type { GameReview } from "$lib/models/user_features/reviews/GameReview";

export default async function getAllGameReviewsPaged(
    page: number,
    pageSize: number,
    homeTeamId: number,
    visitorTeamId: number,
    date: string) {
    const axiosRes = await axiosInstance.get<PagedResponse<GameReview[]>>(
        `user-features/game-reviews/all?Page=${page}&PageSize=${pageSize}&HomeTeamId=${homeTeamId}&VisitorTeamId=${visitorTeamId}&Date=${date}`);
    const response = axiosRes.data;
    return response.data;
}