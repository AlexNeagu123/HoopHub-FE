import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { PlayerFollowEntry } from "$lib/models/user_features/followings/PlayerFollowEntry";

export default async function addPlayerFollowEntry(
    playerId: string
): Promise<PlayerFollowEntry> {
    const payload = {
        playerId: playerId
    };

    const axiosRes = await axiosInstance.post<Response<PlayerFollowEntry>>(
        "user-features/player-follows",
        payload
    );

    const response = axiosRes.data;
    return response.data;
}