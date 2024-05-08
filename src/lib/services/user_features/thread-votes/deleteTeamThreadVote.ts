import { axiosInstance } from "$lib/constants";
import type { BaseResponse } from "$lib/models/common/BaseResponse";

export default async function deleteTeamThreadVote(
    threadId: string
): Promise<BaseResponse> {
    const axiosRes = await axiosInstance.delete<BaseResponse>(
        `user-features/thread-votes/${threadId}`
    );
    return axiosRes.data;
}