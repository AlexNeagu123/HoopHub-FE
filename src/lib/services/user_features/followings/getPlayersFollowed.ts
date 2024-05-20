import { axiosInstance } from "$lib/constants";
import type { PlayerFollowEntry } from "$lib/models/user_features/followings/PlayerFollowEntry";
import type { Response } from "$lib/models/common/Response";

export default async function getPlayersFollowed(): Promise<PlayerFollowEntry[]> {
    const axiosRes = await axiosInstance.get<Response<PlayerFollowEntry[]>>(`user-features/player-follows`);
    const response = axiosRes.data;
    return response.data;
}