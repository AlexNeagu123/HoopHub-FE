import { axiosInstance } from "$lib/constants";
import type { BaseResponse } from "$lib/models/common/BaseResponse";

export default async function deleteComment(
    id: string
): Promise<BaseResponse> {
    const axiosRes = await axiosInstance.delete<BaseResponse>(
        `user-features/comments/${id}`
    );

    const response = axiosRes.data;
    return response;
}