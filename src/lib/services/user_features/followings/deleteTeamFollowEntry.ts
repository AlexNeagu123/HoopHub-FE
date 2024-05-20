import { axiosInstance } from "$lib/constants";
import type { BaseResponse } from "$lib/models/common/BaseResponse";

export default async function deleteTeamFollowEntry(
    teamId: string
): Promise<BaseResponse> {
    const axiosRes = await axiosInstance.delete<BaseResponse>(
        `user-features/team-follows/${teamId}`
    );
    return axiosRes.data;
}