import { axiosInstance } from "$lib/constants";
import type { PlayerFollowEntry } from "$lib/models/user_features/followings/PlayerFollowEntry";
import type { Response } from "$lib/models/common/Response";

export default async function getPlayersFollowed(fanId: string | null = null): Promise<PlayerFollowEntry[]> {
    const url = fanId ? `user-features/player-follows?FanId=${fanId}` : `user-features/player-follows`;
    const axiosRes = await axiosInstance.get<Response<PlayerFollowEntry[]>>(`${url}`);
    const response = axiosRes.data;
    return response.data;
}