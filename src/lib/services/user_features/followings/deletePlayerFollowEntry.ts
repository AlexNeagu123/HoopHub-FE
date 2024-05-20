import { axiosInstance } from "$lib/constants";
import type { BaseResponse } from "$lib/models/common/BaseResponse";

export default async function deletePlayerFollowEntry(
    playerId: string
): Promise<BaseResponse> {
    const axiosRes = await axiosInstance.delete<BaseResponse>(
        `user-features/player-follows/${playerId}`
    );
    return axiosRes.data;
}