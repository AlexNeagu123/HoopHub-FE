import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";

export default async function updateTeamThread(
    commentId: string,
    content: string
): Promise<Response<Comment>> {
    const payload = {
        commentId: commentId,
        content: content
    };

    const axiosRes = await axiosInstance.put<Response<Comment>>(
        `user-features/comments/${commentId}`,
        payload,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
    );

    const response = axiosRes.data;
    return response;
}