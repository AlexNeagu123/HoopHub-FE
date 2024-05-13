import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { GameThread } from "$lib/models/user_features/threads/GameThread";

export default async function getGameThreadsByDate(date: string): Promise<GameThread[]> {
    const axiosRes = await axiosInstance.get<Response<GameThread[]>>(`user-features/game-threads?Date=${date}`);
    const response = axiosRes.data;
    return response.data;
}