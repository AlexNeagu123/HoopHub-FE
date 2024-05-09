import { axiosInstance } from "$lib/constants";
import type { BaseResponse } from "$lib/models/common/BaseResponse";

export default async function deleteTeamThread(
    id: string
): Promise<BaseResponse> {
    const axiosRes = await axiosInstance.delete<BaseResponse>(
        `user-features/team-threads/${id}`
    );

    const response = axiosRes.data;
    return response;
}